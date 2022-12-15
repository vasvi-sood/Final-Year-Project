$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#images").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        // var form_data = new FormData($('#upload-file')[0]);
       var form_data = new FormData();  
    //    console.log("image ",images.files[0])

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        if (form_data) {
            form_data.append("images", images.files[0]);
        // $.ajax({
        //     type: 'POST',
        //     url: '/detections',
        //     data: form_data,
        //     contentType: false,
        //     cache: false,
        //     processData: false,
        //     async: true,
        //     success: function (data) {
        //         // Get and display the result
        //         $('.loader').hide();
        //         $('#result').fadeIn(600);
        //         for(var i=0;i<data.response[0].detections.length;i++) {
        //         $('#result').append(' Result:  ' + data.response[0].detections[i].class+" "+data.response[0].detections[i].confidence);
        //         console.log('result',data.response[0].detections[i].class,data.response[0].detections[i].confidence);
        //         }
        //     },
        // });
        $.ajax({
            type: 'POST',
            url: '/image',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            xhrFields: {
                responseType: "blob",
              },
            
               
              
            success: function (data) {
        //         // Get and display the result
        //         $('.loader').hide();
        //         $('#result').fadeIn(600);
        //         // for(var i=0;i<data.response[0].detections.length;i++) {
        //         // $('#result').append(' Result:  ' + data.response[0].detections[i].class+" "+data.response[0].detections[i].confidence);
        //         // console.log('result',data.response[0].detections[i].class,data.response[0].detections[i].confidence);
        //         // }
        $('.loader').hide();
        $('#result').fadeIn(600);
        const objectURL = URL.createObjectURL(data);
        $('#target').attr('src', objectURL);
        $('#target').attr('height', '500px');
                console.log(data);
            },
        });
    }
    });


    if ('speechSynthesis' in window) {
        // speechSynthesis.onvoiceschanged = function() {
        //   var $voicelist = $('#voices');
    
        //   if($voicelist.find('option').length == 0) {
        //     speechSynthesis.getVoices().forEach(function(voice, index) {
        //       var $option = $('<option>')
        //       .val(index)
        //       .html(voice.name + (voice.default ? ' (default)' :''));
    
        //       $voicelist.append($option);
        //     });
    
        //     $voicelist.material_select();
        //   }
        // }

        $('#btn-text').click(function () {
            // var form_data = new FormData($('#upload-file')[0]);
           var form_data = new FormData();  
        //    console.log("image ",images.files[0])
    
            // Show loading animation
            $(this).hide();
            $('.loader').show();
    
            // Make prediction by calling api /predict
            if (form_data) {
                form_data.append("images", images.files[0]);
            // $.ajax({
            //     type: 'POST',
            //     url: '/detections',
            //     data: form_data,
            //     contentType: false,
            //     cache: false,
            //     processData: false,
            //     async: true,
            //     success: function (data) {
            //         // Get and display the result
            //         $('.loader').hide();
            //         $('#result').fadeIn(600);
            //         for(var i=0;i<data.response[0].detections.length;i++) {
            //         $('#result').append(' Result:  ' + data.response[0].detections[i].class+" "+data.response[0].detections[i].confidence);
            //         console.log('result',data.response[0].detections[i].class,data.response[0].detections[i].confidence);
            //         }
            //     },
            // });
            $.ajax({
                type: 'POST',
                url: '/iText',
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                async: true,
    
                
                   
                  
                success: function (data) {
            //         // Get and display the result
            //         $('.loader').hide();
            //         $('#result').fadeIn(600);
            //         // for(var i=0;i<data.response[0].detections.length;i++) {
            //         // $('#result').append(' Result:  ' + data.response[0].detections[i].class+" "+data.response[0].detections[i].confidence);
            //         // console.log('result',data.response[0].detections[i].class,data.response[0].detections[i].confidence);
            //         // }
            $('.loader').hide();
            console.log(data)
            var text = data;
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[0];
            msg.rate = 1;
            msg.pitch = 1;
            msg.text = text;
      
            msg.onend = function(e) {
              console.log('Finished in ' + e.elapsedTime + ' seconds.');
            };
            
  
            speechSynthesis.speak(msg);
                },
            });
        }
        });
    
        
      }


   

});
