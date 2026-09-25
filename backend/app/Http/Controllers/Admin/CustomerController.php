<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class CustomerController extends Controller
{
    public function index(): View
    {
        $customers = Appointment::query()
            ->select([
                'name',
                'email',
                'phone',
                DB::raw('COUNT(*) as appointments_count'),
                DB::raw('MAX(appointment_date) as last_appointment'),
            ])
            ->groupBy('name', 'email', 'phone')
            ->orderByDesc('last_appointment')
            ->paginate(20);

        return view(
            'admin.customers.index',
            compact('customers')
        );
    }
}