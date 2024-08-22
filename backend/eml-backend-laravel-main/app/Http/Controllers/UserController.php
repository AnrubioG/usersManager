<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController
{
    public function index()
    {
        return User::orderBy("name", "asc")->get();
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }

        return $user;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email:rfc,dns|unique:users,email|max:255',
            'phone' => 'required|string|numeric|digits:10|regex:/^3[0-9]{2}.*$/'
        ], [
            'name.required' => 'El nombre es requerido.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no puede ser mayor a 255 caracteres.',
            'last_name.required' => 'El apellido es requerido.',
            'last_name.string' => 'El apellido debe ser un string.',
            'last_name.max' => 'El apellido no puede ser mayor a 255 caracteres.',
            'email.required' => 'El email es requerido.',
            'email.email' => 'El email debe tener un formato válido.',
            'email.unique' => 'El email ya está registrado.',
            'email.max' => 'El email no puede ser mayor a 255 caracteres.',
            'phone.required' => 'El número de teléfono es requerido.',
            'phone.string' => 'El número de teléfono debe ser un string.',
            'phone.numeric' => 'El número de teléfono sólo debe contener números.',
            'phone.digits' => 'El número de teléfono debe tener 10 caracteres.',
            'phone.regex' => "El número de telefóno debe ser colombiano."
        ]);
        

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone
        ]);

        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email:rfc,dns|max:255',
            'phone' => 'sometimes|string|numeric|digits:10|regex:/^3[0-9]{2}.*$/'
        ], [
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no puede ser mayor a 255 caracteres.',
            'last_name.string' => 'El apellido debe ser un string.',
            'last_name.max' => 'El apellido no puede ser mayor a 255 caracteres.',
            'email.email' => 'El email debe tener un formato válido.',
            'email.unique' => 'El email ya está registrado.',
            'email.max' => 'El email no puede ser mayor a 255 caracteres.',
            'phone.string' => 'El número de teléfono debe ser un string.',
            'phone.numeric' => 'El número de teléfono sólo debe contener números.',
            'phone.digits' => 'El número de teléfono debe tener 10 caracteres.',
            'phone.regex' => "El número de telefóno debe ser colombiano."
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user->update($request->only('name', 'last_name', 'email', 'phone'));

        $user->save();

        return $user;
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Usuario eliminado exitosamente.']);
    }
}
