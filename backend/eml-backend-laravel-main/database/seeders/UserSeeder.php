<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Angela Estela',
            'last_name' => 'Rubio Porras',
            "email" => "rubioporrasangela@gmail.com",
            'phone' => '3017072523',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
