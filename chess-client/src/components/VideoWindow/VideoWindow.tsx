export function  VideoWindow() {
  return (
    <div className="flex justify-center">
        <div className="shadow-lg max-w-sm">
        <video width="320" height="240" controls className="w-full rounded-t-lg">
                  <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                  <source src="movie.ogg" type="video/ogg" />
                  Your browser does not support the video tag.
              </video>
       </div>
  </div>
  );
}