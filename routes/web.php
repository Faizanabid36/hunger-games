<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\QueryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('api/meetings', [MeetingController::class, 'meetings']);
Route::post('save_meeting', [MeetingController::class, 'save_meeting']);
Route::post('save_note', [NoteController::class, 'save_note']);
Route::post('delete_note', [NoteController::class, 'delete_note']);


Route::get('api/query/{id}', [QueryController::class, 'query']);
Route::get('api/queries', [QueryController::class, 'queries']);
Route::get('api/queries_by_users', [QueryController::class, 'queries_by_users']);
Route::get('api/user_queries/{id}', [QueryController::class, 'user_queries']);
Route::post('save_query', [QueryController::class, 'save_query']);
Route::post('query/reply', [QueryController::class, 'reply']);
Route::get('api/query/{id}/respones', [QueryController::class, 'responses']);


Route::get('search/{query}', [QueryController::class, 'search']);
Route::get('emails/{id}', [QueryController::class, 'emails']);
Route::post('toggle_sensitivity/{id}', [QueryController::class, 'toggle_sensitivity']);
Route::post('resolve_query/{id}', [QueryController::class, 'resolve_query']);


Route::get('api/contacts', [ContactController::class, 'contacts']);
Route::post('save_contact', [ContactController::class, 'save_contact']);
Route::post('contact/delete/{id}', [ContactController::class, 'delete_contact']);



Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/{path?}', [App\Http\Controllers\HomeController::class, 'index'])->where('path', '.*');
