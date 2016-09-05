<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Abraham\TwitterOAuth\TwitterOAuth;

class HomeController extends Controller
{
    
    /**
     * Render Layout
     * @return [html] [ GoogleMap, Search Input, Search Button  ]
     */
    public function index() 
    {
       return view('home');
    }

    /**
     * Search Tweets in Location
     * @param  Request $request [latitude, longitude]
     * @return [json]           [result of tweets in location]
     */
    public function search(Request $request) 
    {

        $configs = config('twitter');

        $connection = new TwitterOAuth(
            $configs['client_id'], 
            $configs['client_secret'], 
            $configs['token'], 
            $configs['verify']
        );

        $radius                = $configs['radius'];
        $params['count']       = $configs['count'];
        $params['result_type'] = $configs['result_type'];
        

        if ($request->has('latitude') && $request->has('longitude')) {
            $params['geocode'] = $_GET['latitude'].",".$_GET['longitude']."," . $radius;
        }

        $result = $connection->get("search/tweets", $params);

        if (isset($result->errors)) {
            return response()
                ->json($result->errors);
        } else {
            return response()
                ->json($result->statuses);
            
        }

    }

}
