<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
      $query = User::query();

     if ($request->search) {
         $query->where(function ($q) use ($request) {
             $q->where('name', 'like', "%{$request->search}%")
               ->orWhere('email', 'like', "%{$request->search}%")
               ->orWhere('phone', 'like', "%{$request->search}%");
         });
     }

       $users = $query->paginate(5);

       return response()->json($users);
    }

    public function store(Request $request)
    {
      $user = User::create([
         'name' => $request->name,
         'email' => $request->email,
         'phone' => $request->phone,
         'status' => $request->status
      ]);

      return response()->json($user, 200);
    }

    public function show($id)
    {
        return User::find($id);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->update($request->all());
        return $user;
    }

    public function destroy($id)
    {
        return User::destroy($id);
    }
    public function dashboardStats()
    {
       return response()->json([
         'total_users' => User::count(),
         'active_users' => User::where('status', 'active')->count(),
         'inactive_users' => User::where('status', 'inactive')->count(),
      ]);
    }

}
