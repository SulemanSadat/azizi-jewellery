@extends('admin.layouts.app')

@section('title', 'Appointment')
@section('page-heading', 'Appointment Details')

@section('content')

<div class="max-w-5xl">

    @if(session('success'))
        <div class="mb-6 border border-[#d9c99f] bg-[#fbf8ef] px-5 py-4 text-sm text-[#66583a]">
            {{ session('success') }}
        </div>
    @endif

    <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

        <div>
            <p class="text-[10px] uppercase tracking-[0.22em] text-[#a98d58]">
                Appointment
            </p>

            <h2 class="mt-2 text-3xl font-light">
                {{ $appointment->name }}
            </h2>

            <p class="mt-2 text-sm text-[#77736b]">
                Created {{ $appointment->created_at->format('d M Y, H:i') }}
            </p>
        </div>

        <span class="inline-flex w-fit rounded-full border border-[#ded8cc] px-4 py-2 text-[10px] uppercase tracking-[0.16em]">
            {{ $appointment->status }}
        </span>

    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-3">

        <div class="border border-[#ded8cc] bg-white p-6 lg:col-span-2">

            <p class="text-[10px] uppercase tracking-[0.2em] text-[#a98d58]">
                Customer information
            </p>

            <div class="mt-6 grid gap-6 sm:grid-cols-2">

                <div>
                    <p class="text-xs text-[#8c877e]">Name</p>
                    <p class="mt-1 text-sm">{{ $appointment->name }}</p>
                </div>

                <div>
                    <p class="text-xs text-[#8c877e]">Phone</p>
                    <p class="mt-1 text-sm">{{ $appointment->phone }}</p>
                </div>

                <div>
                    <p class="text-xs text-[#8c877e]">Email</p>
                    <p class="mt-1 text-sm">{{ $appointment->email ?: '—' }}</p>
                </div>

                <div>
                    <p class="text-xs text-[#8c877e]">Service</p>
                    <p class="mt-1 text-sm">{{ $appointment->service }}</p>
                </div>

                <div>
                    <p class="text-xs text-[#8c877e]">Date</p>
                    <p class="mt-1 text-sm">
                        {{ $appointment->appointment_date->format('d F Y') }}
                    </p>
                </div>

                <div>
                    <p class="text-xs text-[#8c877e]">Time</p>
                    <p class="mt-1 text-sm">
                        {{ $appointment->appointment_time }}
                    </p>
                </div>

            </div>

            <div class="mt-8 border-t border-[#eeeae2] pt-6">

                <p class="text-xs text-[#8c877e]">
                    Customer notes
                </p>

                <p class="mt-2 whitespace-pre-line text-sm leading-7 text-[#55514a]">
                    {{ $appointment->notes ?: 'No notes provided.' }}
                </p>

            </div>

        </div>

        <div class="border border-[#ded8cc] bg-white p-6">

            <p class="text-[10px] uppercase tracking-[0.2em] text-[#a98d58]">
                Actions
            </p>

            <div class="mt-6 space-y-3">

                @if($appointment->status !== 'confirmed')

                    <form method="POST" action="{{ route('admin.appointments.confirm', $appointment) }}">
                        @csrf
                        @method('PATCH')

                        <button class="w-full bg-[#242321] px-4 py-3 text-xs uppercase tracking-[0.14em] text-white hover:bg-[#3b3935]">
                            Confirm
                        </button>
                    </form>

                @endif

                @if($appointment->status !== 'completed')

                    <form method="POST" action="{{ route('admin.appointments.complete', $appointment) }}">
                        @csrf
                        @method('PATCH')

                        <button class="w-full border border-[#ded8cc] px-4 py-3 text-xs uppercase tracking-[0.14em] hover:bg-[#faf9f6]">
                            Mark Completed
                        </button>
                    </form>

                @endif

                @if($appointment->status !== 'cancelled')

                    <form method="POST" action="{{ route('admin.appointments.cancel', $appointment) }}">
                        @csrf
                        @method('PATCH')

                        <button class="w-full border border-[#ded8cc] px-4 py-3 text-xs uppercase tracking-[0.14em] text-[#75685c] hover:bg-[#faf9f6]">
                            Cancel
                        </button>
                    </form>

                @endif

                <a
                    href="{{ route('admin.appointments.edit', $appointment) }}"
                    class="block w-full border border-[#ded8cc] px-4 py-3 text-center text-xs uppercase tracking-[0.14em] hover:bg-[#faf9f6]"
                >
                    Edit Appointment
                </a>

            </div>

        </div>

    </div>

</div>

@endsection