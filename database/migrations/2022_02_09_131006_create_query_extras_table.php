<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('query_extras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('query_id')->constrained('queries');
            $table->enum('status', ['Open', 'In process', 'Closed', 'Blocked']);
            $table->boolean('is_sensitive')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('query_extras');
    }
};
