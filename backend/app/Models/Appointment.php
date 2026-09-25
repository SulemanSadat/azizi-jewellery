<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
       'user_id',
        'name',
        'phone',
        'email',
        'service',
        'appointment_date',
        'appointment_time',
        'notes',
        'status',
    ];

    protected $casts = [
        'appointment_date' => 'date',
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}
}