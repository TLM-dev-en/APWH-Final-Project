function parseJSON(jsonPath) {
    return fetch(jsonPath) // Return the fetch promise
        .then(response => response.json())
        .then(data => {
            return {
                quizQuestions: data.questions,
                quizTitle: data.name,
                quizLength: Object.keys(data.questions).length,
            };
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });        
}
    
export default parseJSON;