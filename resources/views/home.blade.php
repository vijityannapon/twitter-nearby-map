<!DOCTYPE html>
<html>
    <head>
        <title>Tweets Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

        <link rel="stylesheet" href="{{ URL::asset('/assets/css/custom.css') }}" />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfA9UUkERXuMPUWAvgBIhNBBtIF7ymrQw&libraries=places"></script>

        <script type="text/javascript" src="{{ URL::asset('/assets/js/script.js') }}"></script>

    </head>

    <body>
        <dlv class="row">
            <div class="col-sm-12">
                <div class="map" id="map"></div>
            </div>

            <div class="col-sm-12">
                <div class="input-group">
                    <input type="text" class="form-control" id="location" name="location" placeholder="Search for...">
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="submit" id="search">Go!</button>
                    </span>
                </div>
            </div>
        </div>

    </body>
</html>