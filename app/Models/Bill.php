<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $guarded = [];


    public function billPayments()
    {
        return $this->hasMany(BillPayment::class);
    }


    
    



    

    
}
