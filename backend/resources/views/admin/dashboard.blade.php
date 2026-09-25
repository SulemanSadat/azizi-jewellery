@extends('admin.layouts.app')

@section('title', 'Dashboard')

@section('page-heading', 'Dashboard')

@section('content')

    <div class="mb-8">
        <p class="text-sm text-[#77736b]">
            Welcome back, {{ auth()->user()->name }}.
        </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        @php
            $cards = [
                [
                    'label' => 'Total Appointments',
                    'value' => $stats['appointments'],
                ],
                [
                    'label' => 'Pending',
                    'value' => $stats['pending_appointments'],
                ],
                [
                    'label' => 'Confirmed',
                    'value' => $stats['confirmed_appointments'],
                ],
                [
                    'label' => 'Completed',
                    'value' => $stats['completed_appointments'],
                ],
                [
                    'label' => 'Cancelled',
                    'value' => $stats['cancelled_appointments'],
                ],
                [
                    'label' => 'Subscribers',
                    'value' => $stats['subscribers'],
                ],
            ];
        @endphp

        @foreach ($cards as $card)

            <div class="group border border-[#ded8cc] bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(36,35,33,0.06)]">

                <div class="flex items-start justify-between">

                    <p class="text-[10px] uppercase tracking-[0.2em] text-[#8c877e]">
                        {{ $card['label'] }}
                    </p>

                    <span class="h-2 w-2 rounded-full bg-[#d8bd82]"></span>

                </div>

                <p class="mt-5 text-3xl font-light tracking-tight text-[#242321]">
                    {{ $card['value'] }}
                </p>

            </div>

        @endforeach

    </div>

    <section class="mt-8 border border-[#ded8cc] bg-white">

        <div class="flex items-center justify-between border-b border-[#ded8cc] px-6 py-5">

            <div>
                <p class="text-[10px] uppercase tracking-[0.2em] text-[#a98d58]">
                    Schedule
                </p>

                <h2 class="mt-1 text-lg font-medium">
                    Upcoming Appointments
                </h2>
            </div>

        </div>

        <div class="overflow-x-auto">

            <table class="min-w-full text-left">

                <thead>
                    <tr class="border-b border-[#ded8cc] text-[10px] uppercase tracking-[0.16em] text-[#8c877e]">
                        <th class="px-6 py-4 font-medium">Customer</th>
                        <th class="px-6 py-4 font-medium">Service</th>
                        <th class="px-6 py-4 font-medium">Date</th>
                        <th class="px-6 py-4 font-medium">Time</th>
                        <th class="px-6 py-4 font-medium">Status</th>
                    </tr>
                </thead>

                <tbody>

                    @forelse ($upcomingAppointments as $appointment)

                        <tr class="border-b border-[#eeeae2] last:border-0 hover:bg-[#faf9f6]">

                            <td class="px-6 py-5">
                                <p class="text-sm font-medium">
                                    {{ $appointment->name }}
                                </p>

                                <p class="mt-1 text-xs text-[#8c877e]">
                                    {{ $appointment->email }}
                                </p>
                            </td>

                            <td class="px-6 py-5 text-sm text-[#55514a]">
                                {{ $appointment->service }}
                            </td>

                            <td class="px-6 py-5 text-sm">
                                {{ $appointment->appointment_date->format('d M Y') }}
                            </td>

                            <td class="px-6 py-5 text-sm">
                                {{ $appointment->appointment_time }}
                            </td>

                            <td class="px-6 py-5">

                                <span class="inline-flex rounded-full border border-[#ded8cc] px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[#6e675d]">
                                    {{ $appointment->status }}
                                </span>

                            </td>

                        </tr>

                    @empty

                        <tr>
                            <td colspan="5" class="px-6 py-14 text-center">

                                <p class="text-sm text-[#77736b]">
                                    No upcoming appointments.
                                </p>

                            </td>
                        </tr>

                    @endforelse

                </tbody>

            </table>

        </div>

    </section>

@endsection