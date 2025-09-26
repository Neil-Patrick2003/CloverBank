<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $guarded = [];

    public function customer ()
    {
        return $this->belongsTo(Customer::class);
    }


    public function transfersFrom()
    {
        return $this->hasMany(Transfer::class, 'from_account_id');
    }

    public function transfersTo()
    {
        return $this->hasMany(Transfer::class, 'to_account_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }


}
