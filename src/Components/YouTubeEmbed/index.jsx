const YouTubeEmbed = ({videoUrl}) => {
    const videoId = videoUrl.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    return(
        <>
            <div className="h-full">
                <iframe
                    className=" top-0 w-full "
                    src={embedUrl}
                    width="100%"

                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded YouTube Video"
                ></iframe>
            </div>
        </>
    )
}

export default YouTubeEmbed
