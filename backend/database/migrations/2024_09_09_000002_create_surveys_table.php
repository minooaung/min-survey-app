<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
//use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            //$table->foreignId(\App\Models\User::class, 'user_id');
            $table->unsignedBigInteger('user_id')->after('id'); // Add the user_id column
            // If you have a users table and want a foreign key constraint:
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('image', 255)->nullable();
            $table->string('title', 1000);
            $table->string('slug', 1000);
            $table->tinyInteger('status');
            $table->text('description')->nullable();
            $table->timestamps();
            $table->timestamp('expire_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //Schema::dropIfExists('surveys');

        Schema::table('surveys', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};
