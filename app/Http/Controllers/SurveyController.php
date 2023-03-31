<?php

namespace App\Http\Controllers;

use App\Http\Requests\SurveyStoreRequest;
use App\Http\Requests\SurveyUpdateRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Str; 
use Illuminate\Support\Facades\File;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        ///pass the survey to surveyresources
        return SurveyResource::collection(
            Survey::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
        ); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SurveyStoreRequest $request)
    {
        // $user = $request->user(); 

        // return Survey::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
        $data = $request->validated(); 

        //check if iamge was given and save on local file system
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']); 
            $data['image'] = $relativePath;
        }

        $survey = Survey::created($data); 

        //create new question
        foreach ($data['question'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }

        return new SurveyResource($survey);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SurveyUpdateRequest $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function saveImage($image)
    {
        //check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            //take out the based encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1); 
            //get file extension
            $type = strtolower($type[1]); // jpg, png, gif
            
            //check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type'); 
            }

            $image = str_replace(' ', '+', $image); 
            $image = base64_decode($image); 

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/'; 
        $file = Str::random() . '.' . $types; 
        $absolutePath = public_path($dir); 
        $relativePath = $dir . $file; 
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true); 
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    private function createQuestion($data) 
    {

    }

}

 