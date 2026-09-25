<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class AppointmentController extends Controller
{
    public function index(Request $request): View
    {
        $query = Appointment::query();

        if ($request->filled('search')) {
            $search = $request->string('search');

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('date')) {
            $query->whereDate(
                'appointment_date',
                $request->string('date')
            );
        }

        $appointments = $query
            ->latest('appointment_date')
            ->latest('appointment_time')
            ->paginate(15)
            ->withQueryString();

        return view('admin.appointments.index', compact('appointments'));
    }

    public function show(Appointment $appointment): View
    {
        return view('admin.appointments.show', compact('appointment'));
    }

    public function edit(Appointment $appointment): View
    {
        return view('admin.appointments.edit', compact('appointment'));
    }

    public function update(
        Request $request,
        Appointment $appointment
    ): RedirectResponse {

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'service' => ['required', 'string', 'max:255'],
            'appointment_date' => ['required', 'date'],
            'appointment_time' => ['required', 'date_format:H:i'],
            'notes' => ['nullable', 'string'],
            'status' => [
                'required',
                'in:pending,confirmed,cancelled,completed',
            ],
        ]);

        $appointment->update($validated);

        return redirect()
            ->route('admin.appointments.show', $appointment)
            ->with('success', 'Appointment updated successfully.');
    }

    public function confirm(Appointment $appointment): RedirectResponse
    {
        $appointment->update([
            'status' => 'confirmed',
        ]);

        return back()->with('success', 'Appointment confirmed.');
    }

    public function cancel(Appointment $appointment): RedirectResponse
    {
        $appointment->update([
            'status' => 'cancelled',
        ]);

        return back()->with('success', 'Appointment cancelled.');
    }

    public function complete(Appointment $appointment): RedirectResponse
    {
        $appointment->update([
            'status' => 'completed',
        ]);

        return back()->with('success', 'Appointment marked as completed.');
    }

    public function destroy(Appointment $appointment): RedirectResponse
    {
        $appointment->delete();

        return redirect()
            ->route('admin.appointments.index')
            ->with('success', 'Appointment deleted.');
    }
}