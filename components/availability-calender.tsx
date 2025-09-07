"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

interface AvailabilityCalendarProps {
  selectedDate?: string
  selectedTime?: string
  onDateTimeSelect: (date: string, time: string) => void
  serviceId?: string
}

const AVAILABLE_TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]
const MOCK_BOOKINGS = new Set([
  "2025-09-17-10:00 AM", // Example booking
])

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export function AvailabilityCalendar({
  selectedDate,
  selectedTime,
  onDateTimeSelect,
  serviceId,
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDateForTimes, setSelectedDateForTimes] = useState<string | null>(selectedDate || null)

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toLocalDateString(today);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const dateStr = toLocalDateString(current);
      const isCurrentMonth = current.getMonth() === month
      const isPast = current < today
      const isToday = dateStr === todayStr
      const isWeekend = current.getDay() === 0 || current.getDay() === 6
      const hasAvailableSlots = AVAILABLE_TIMES.some((time) => !MOCK_BOOKINGS.has(`${dateStr}-${time}`))

      days.push({
        dateStr,
        day: current.getDate(),
        isCurrentMonth,
        isPast,
        isToday,
        isWeekend,
        hasAvailableSlots: isCurrentMonth && !isPast && !isWeekend && hasAvailableSlots,
        isSelected: dateStr === selectedDateForTimes,
      })
      current.setDate(current.getDate() + 1)
    }
    return days
  }, [currentMonth, selectedDateForTimes, todayStr, today])

  const availableTimesForDate = useMemo(() => {
    if (!selectedDateForTimes) return []
    return AVAILABLE_TIMES.map((time) => ({
      time,
      available: !MOCK_BOOKINGS.has(`${selectedDateForTimes}-${time}`),
    }))
  }, [selectedDateForTimes])

  // --- THIS IS THE FIX ---
  const handleDateClick = (dateStr: string, hasAvailableSlots: boolean) => {
    if (hasAvailableSlots) {
      setSelectedDateForTimes(dateStr);
      // Immediately update the parent and clear the time to force a new time selection.
      onDateTimeSelect(dateStr, "");
    }
  }
  // -------------------------

  const handleTimeClick = (time: string) => {
    if (selectedDateForTimes) {
      onDateTimeSelect(selectedDateForTimes, time)
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      newMonth.setDate(1);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const formatSelectedDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00")
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-xl">Select Date</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")} className="h-8 w-8 p-0 hover:bg-beige"><ChevronLeft className="h-4 w-4" /></Button>
              <span className="font-medium text-charcoal min-w-[140px] text-center">{MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")} className="h-8 w-8 p-0 hover:bg-beige"><ChevronRight className="h-4 w-4" /></Button>
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
                onClick={() => handleDateClick(day.dateStr, day.hasAvailableSlots)}
                disabled={!day.hasAvailableSlots}
                className={`p-2 text-sm rounded-md transition-colors relative ${!day.isCurrentMonth ? "text-charcoal/20" : ""} ${day.isPast ? "text-charcoal/30 cursor-not-allowed" : ""} ${day.isToday ? "ring-2 ring-brand ring-offset-1" : ""} ${day.isWeekend && day.isCurrentMonth && !day.isPast ? "text-charcoal/40" : ""} ${day.hasAvailableSlots ? "hover:bg-brand/10 cursor-pointer text-charcoal" : ""} ${day.isSelected ? "bg-brand text-cream" : ""} ${!day.hasAvailableSlots && day.isCurrentMonth && !day.isPast && !day.isWeekend ? "text-charcoal/40" : ""}`}
              >
                {day.day}
                {day.hasAvailableSlots && !day.isSelected && (<div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand rounded-full"></div>)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-charcoal/60">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-brand rounded-full"></div><span>Available</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-charcoal/30 rounded-full"></div><span>Unavailable</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 border border-brand rounded-full"></div><span>Today</span></div>
          </div>
        </CardContent>
      </Card>
      {selectedDateForTimes && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl flex items-center gap-2"><Clock className="w-5 h-5 text-brand" />Available Times</CardTitle>
            <p className="text-sm text-charcoal/70">{formatSelectedDate(selectedDateForTimes)}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableTimesForDate.map(({ time, available }) => (
                <button
                  key={time}
                  onClick={() => (available ? handleTimeClick(time) : undefined)}
                  disabled={!available}
                  className={`p-3 rounded-md text-sm font-medium transition-colors ${available ? "bg-cream hover:bg-brand hover:text-cream border border-brand/20 text-charcoal cursor-pointer" : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed"} ${selectedTime === time ? "bg-brand text-cream" : ""}`}
                >
                  {time}
                </button>
              ))}
            </div>
            {availableTimesForDate.every((slot) => !slot.available) && (
              <div className="text-center py-8 text-charcoal/60">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No available times for this date</p>
                <p className="text-sm mt-1">Please select another date</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}