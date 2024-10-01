<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyResourceDashboard;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        

        // Total number of Surveys
        $total = Survey::where('user_id', $user->id)->count();

        //print_r($total); exit;

        // Latest Survey
        $latest = Survey::where('user_id', $user->id)->latest('created_at')->first();

        // print_r($latest); exit;
        // print_r($latest->title); exit;

        // Total number of answers
        $totalAnswers = SurveyAnswer::join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
                                    -> where('surveys.user_id', $user->id)
                                    ->count();

        // print_r($totalAnswers); exit;

        // Latest 5 answer
        $latestAnswers = SurveyAnswer::join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')                                    
                                    ->where('surveys.user_id', $user->id)
                                    ->orderByDesc('survey_answers.end_date')
                                    ->limit(5)
                                    ->select('survey_answers.*', 'surveys.title')
                                    ->get();

        // Latest 5 answer
        // $latestAnswers = SurveyAnswer::query()
        //                             ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
        //                             ->where('surveys.user_id', $user->id)
        //                             ->orderBy('end_date', 'DESC')
        //                             ->limit(5)
        //                             ->getModels('survey_answers.*');

        //print_r($latestAnswers); exit;

        $response = [
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyResourceDashboard($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswers)
        ];        

        return $response;
    }
}
