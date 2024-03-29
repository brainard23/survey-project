<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SurveyUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $survey = $this->route('survey'); 
        //only the owner can cange the survey
        if ($this->user()->id !== $survey->user_id){
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:100', 
            'image' => 'string', 
            'user_id' => 'exist:user,id',
            'status' => 'required|boolean', 
            'description' => 'nullable|string', 
            'expire_date' => 'nullable|date|after:today', 
            'question' => 'array'
        ];
    }
}
