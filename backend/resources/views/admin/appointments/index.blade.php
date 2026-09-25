@extends('admin.layouts.app')

@section('title', 'Appointments')
@section('page-heading', 'Appointments')

@section('content')

<div class="flex flex-col gap-6">

    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>
            <p class="text-[10px] uppercase tracking-[0.22em] text-[#a98d58]">
                Client management
            </p>

            <h2 class="mt-1 text-2xl font-light tracking-tight">
                Appointments
            </h2>

            <p class="mt-2 text-sm text-[#77736b]">
                Manage customer enquiries and private appointments.
            </p>
        </div>

        <div class="text-sm text-[#77736b]">
            {{ $appointments->total() }} total
        </div>

    </div>

    <form
        method="GET"
        class="border border-[#ded8cc] bg-white p-5"
    >
        <div class="grid gap-4 md:grid-cols-4">

            <input
                type="text"
                name="search"
                value="{{ request('search') }}"
                placeholder="Search customer..."
                class="h-11 border border-[#ded8cc] bg-[#faf9f6] px-4 text-sm outline-none focus:border-[#b59a67]"
            >

            <select
                name="status"
                class="h-11 border border-[#ded8cc] bg-[#faf9f6] px-4 text-sm outline-none focus:border-[#b59a67]"
            >
                <option value="">All statuses</option>
                <option value="pending" @selected(request('status') === 'pending')>Pending</option>
                <option value="confirmed" @selected(request('status') === 'confirmed')>Confirmed</option>
                <option value="completed" @selected(request('status') === 'completed')>Completed</option>
                <option value="cancelled" @selected(request('status') === 'cancelled')>Cancelled</option>
            </select>

            <input
                type="date"
                name="date"
                value="{{ request('date') }}"
                class="h-11 border border-[#ded8cc] bg-[#faf9f6] px-4 text-sm outline-none focus:border-[#b59a67]"
            >

            <button
                type="submit"
                class="h-11 bg-[#242321] px-6 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-[#3b3935]"
            >
                Filter
            </button>

        </div>
    </form>

    <div class="overflow-hidden border border-[#ded8cc] bg-white">

        <div class="overflow-x-auto">

            <table class="min-w-full text-left">

                <thead>
                    <tr class="border-b border-[#ded8cc] text-[10px] uppercase tracking-[0.16em] text-[#8c877e]">
                        <th class="px-6 py-4">Customer</th>
                        <th class="px-6 py-4">Service</th>
                        <th class="px-6 py-4">Appointment</th>
                        <th class="px-6 py-4">Status</th>
                        <th class="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>

                <tbody>

                    @forelse($appointments as $appointment)

                    <tr class="border-b border-[#eeeae2] last:border-0 hover:bg-[#faf9f6]">

                        <td class="px-6 py-5">
                            <p class="text-sm font-medium">
                                {{ $appointment->name }}
                            </p>

                            <p class="mt-1 text-xs text-[#8c877e]">
                                {{ $appointment->email ?: $appointment->phone }}
                            </p>
                        </td>

                        <td class="px-6 py-5 text-sm text-[#55514a]">
                            {{ $appointment->service }}
                        </td>

                        <td class="px-6 py-5">
                            <p class="text-sm">
                                {{ $appointment->appointment_date->format('d M Y') }}
                            </p>

                            <p class="mt-1 text-xs text-[#8c877e]">
                                {{ $appointment->appointment_time }}
                            </p>
                        </td>

                        <td class="px-6 py-5">

                            <span class="inline-flex rounded-full border border-[#ded8cc] px-3 py-1 text-[10px] uppercase tracking-[0.12em]">
                                {{ $appointment->status }}
                            </span>

                        </td>

                        <td class="px-6 py-5 text-right">

                            <a
                                href="{{ route('admin.appointments.show', $appointment) }}"
                                class="text-xs uppercase tracking-[0.14em] text-[#a98d58] hover:text-[#242321]"
                            >
                                View
                            </a>

                        </td>

                    </tr>

                    @empty

                    <tr>
                        <td colspan="5" class="px-6 py-16 text-center">
                            <p class="text-sm text-[#77736b]">
                                No appointments found.
                            </p>
                        </td>
                    </tr>

                    @endforelse

                </tbody>

            </table>

        </div>

        @if($appointments->hasPages())

            <div class="border-t border-[#ded8cc] px-6 py-5">
                {{ $appointments->links() }}
            </div>

        @endif

    </div>

</div>

@endsection