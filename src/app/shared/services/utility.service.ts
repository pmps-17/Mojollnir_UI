import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  generateTimeSlots(): string[] {
    const startHour = 7; // 07:00
    const endHour = 19; // 17:00 (last slot ends at 18:00)
    const timeSlots: string[] = [];

    const currentDate = new Date(); // Get the current date and time
    const currentMinutes = currentDate.getMinutes();
    const currentHour = currentDate.getHours();

    // Start generating time slots
    const startTime = new Date(currentDate.setHours(startHour, 0, 0, 0)); // Start at 07:00
    const endTime = new Date(currentDate.setHours(endHour, 30, 0, 0)); // End at 17:30

    // Determine the current time for slot generation
    let currentTime = new Date(currentDate);
    if (currentMinutes < 30) {
        currentTime.setMinutes(30); // Round up to the next 30-minute mark
    } else {
        currentTime.setHours(currentHour + 1, 0, 0, 0); // Round up to the next hour
    }

    // Generate time slots in 30-minute increments
    for (let time = startTime; time <= endTime; time.setMinutes(time.getMinutes() + 30)) {
        const slotStart = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const slotEnd = new Date(time);
        slotEnd.setMinutes(slotEnd.getMinutes() + 30); // End time is 30 minutes later
        const slotEndFormatted = slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Only add slots that are greater than or equal to the current time
        if (time >= currentTime) {
            timeSlots.push(`${slotStart} - ${slotEndFormatted}`);
        }
    }

    return timeSlots;
}
}
