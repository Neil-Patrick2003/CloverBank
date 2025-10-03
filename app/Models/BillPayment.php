<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BillPayment extends Model
{
    protected $guarded = [];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }
}
