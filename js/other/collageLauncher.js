
    // Here we apply the actual CollagePlus plugin
    function collage() {
        $('#block-views-jaunumi-block').removeWhitespace().collagePlus(
            {
                'fadeSpeed'     : 2000,
                'targetHeight'  : 200,
                'effect'        : 'effect-2',
                'direction'     : 'vertical',
                'allowPartialLastRow':true
            }
        );
    };
