"use client"

import { useState, useMemo, useEffect } from "react"
import useSWR from "swr"
import { format, addYears, startOfDay, isBefore, isSameDay, startOfMonth, endOfMonth, isAfter } from 'date-fns'
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "./loading-spinner"

// Helper to fetch data with SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface AvailabilityCalendarProps {
  selectedDate?: string
  selectedTime?: string
  onDateTimeSelect: (date: string, time: string) => void
  serviceId?: string
}

const AVAILABLE_TIMES = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MAX_BOOKINGS_PER_DAY = 3;

export function AvailabilityCalendar({
  selectedDate,
  selectedTime,
  onDateTimeSelect,
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthQuery = format(currentMonth, 'yyyy-MM');
  const { data: availabilityData, error, isLoading } = useSWR(`/api/availability?month=${monthQuery}`, fetcher);

  // --- START OF DATE FIX ---
  // Ensure all date comparisons are against the start of the day to avoid timezone issues.
  const today = startOfDay(new Date()); 
  const oneYearFromNow = startOfDay(addYears(today, 1));
  // --- END OF DATE FIX ---

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = firstDayOfMonth.getDay();
    
    const days = [];
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startingDay);

    for (let i = 0; i < 42; i++) {
      const currentDay = startOfDay(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
      const dateStr = format(currentDay, 'yyyy-MM-dd');
      
      const bookingsForThisDay = availabilityData?.bookingsByDate?.[dateStr] || 0;
      
      // --- CORRECTED LOGIC for disabling dates ---
      const isDisabled = 
        isBefore(currentDay, today) ||              // Is in the past
        isAfter(currentDay, oneYearFromNow) ||      // Is more than 1 year in the future
        currentDay.getDay() === 0 ||                // Is a Sunday
        currentDay.getDay() === 6 ||                // Is a Saturday
        bookingsForThisDay >= MAX_BOOKINGS_PER_DAY; // Is fully booked

      days.push({
        date: currentDay,
        dateStr,
        dayOfMonth: currentDay.getDate(),
        isCurrentMonth: currentDay.getMonth() === month,
        isDisabled,
        isToday: isSameDay(currentDay, today),
        isSelected: selectedDate === dateStr,
      });
    }
    return days;
  }, [currentMonth, selectedDate, today, oneYearFromNow, availabilityData]);

  const availableTimesForDate = useMemo(() => {
    if (!selectedDate || !availabilityData) return [];
    
    return AVAILABLE_TIMES.map((time) => {
      const timeSlotKey = `${selectedDate}_${time}`;
      const isBooked = availabilityData.bookingsByTimeSlot?.[timeSlotKey] || false;
      return {
        time,
        isAvailable: !isBooked,
      };
    });
  }, [selectedDate, availabilityData]);

  const handleDateClick = (dateStr: string, isDisabled: boolean) => {
    if (isDisabled) return;
    onDateTimeSelect(dateStr, "");
  };

  const handleTimeClick = (time: string) => {
    if (selectedDate) {
      onDateTimeSelect(selectedDate, time);
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setDate(1);
      newMonth.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newMonth;
    });
  };
  
  // --- CORRECTED LOGIC for disabling navigation buttons ---
  const isPrevMonthDisabled = isBefore(startOfMonth(currentMonth), startOfMonth(today));
  const isNextMonthDisabled = isAfter(startOfMonth(currentMonth), startOfMonth(oneYearFromNow));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-xl">Select Date</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")} disabled={isPrevMonthDisabled} className="h-8 w-8 p-0 hover:bg-beige"><ChevronLeft className="h-4 w-4" /></Button>
              <span className="font-medium text-charcoal min-w-[140px] text-center">{MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")} disabled={isNextMonthDisabled} className="h-8 w-8 p-0 hover:bg-beige"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_OF_WEEK.map((day) => (<div key={day} className="p-2 text-center text-sm font-medium text-charcoal/60">{day}</div>))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day.dateStr, day.isDisabled)}
                disabled={day.isDisabled}
                className={`p-2 text-sm rounded-md transition-colors relative 
                  ${!day.isCurrentMonth ? "text-charcoal/20" : ""} 
                  ${day.isToday ? "ring-2 ring-brand ring-offset-1" : ""} 
                  ${day.isDisabled ? "text-charcoal/30 cursor-not-allowed line-through" : "hover:bg-brand/10 cursor-pointer text-charcoal"}
                  ${day.isSelected ? "bg-brand text-cream" : ""}`}
              >
                {day.dayOfMonth}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      {isLoading && (
        <div className="text-center py-8 text-charcoal/60">
            <LoadingSpinner />
            <p className="mt-2 text-sm">Checking available slots...</p>
        </div>
      )}
      {selectedDate && !isLoading && (
        <Card className="animate-in fade-in">
          <CardHeader>
            <CardTitle className="font-serif text-xl flex items-center gap-2"><Clock className="w-5 h-5 text-brand" />Available Times</CardTitle>
            <p className="text-sm text-charcoal/70">{format(new Date(`${selectedDate}T00:00:00`), 'EEEE, MMMM d, yyyy')}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableTimesForDate.map(({ time, isAvailable }) => (
                <button
                  key={time}
                  onClick={() => (isAvailable ? handleTimeClick(time) : undefined)}
                  disabled={!isAvailable}
                  className={`p-3 rounded-md text-sm font-medium transition-colors 
                    ${isAvailable ? "bg-cream hover:bg-brand hover:text-cream border border-brand/20 text-charcoal cursor-pointer" : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed line-through"} 
                    ${selectedTime === time ? "bg-brand text-cream" : ""}`}
                >
                  {time}
                </button>
              ))}
            </div>
            {availableTimesForDate.every((slot) => !slot.isAvailable) && (
              <div className="text-center py-8 text-charcoal/60">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No available times for this date</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

