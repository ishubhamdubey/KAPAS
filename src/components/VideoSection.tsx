import { useState, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

const videos = [
  { id: 1, title: 'Summer Collection Lookbook', thumbnail: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600&h=1000', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 2, title: 'Festive Wear Styling Guide', thumbnail: 'https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&w=600&h=1000', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 3, title: 'Casual Day Outfits', thumbnail: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600&h=1000', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 4, title: 'Designer Collection Preview', thumbnail: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=600&h=1000', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 5, title: 'Party Wear Trends', thumbnail: 'https://images.pexels.com/photos/6896166/pexels-photo-6896166.jpeg?auto=compress&cs=tinysrgb&w=600&h=1000', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 6, title: 'Traditional Ethnic Wear', thumbnail: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=600&h=1000', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 7, title: 'Backless Kurti Styling', thumbnail: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600&h=1000', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="videos" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Style Videos</h2>
          <div className="w-24 h-1 bg-[#ff6b81] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Watch our latest fashion tutorials and styling tips</p>
        </div>

        <div className="relative group">
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100">
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>

          <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {videos.map((video) => (
              <div key={video.id} className="relative group/video cursor-pointer flex-shrink-0 w-[220px] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" onClick={() => setSelectedVideo(video.id)}>
                <div className="relative aspect-[9/16] overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover/video:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover/video:bg-opacity-40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 group-hover/video:bg-[#ff6b81] group-hover/video:bg-opacity-90 rounded-full p-4 transition-all duration-300 transform group-hover/video:scale-110">
                      <Play className="w-8 h-8 text-[#ff6b81] group-hover/video:text-white fill-current transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100">
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
              <button onClick={() => setSelectedVideo(null)} className="absolute -top-12 right-0 bg-white hover:bg-gray-100 rounded-full p-2 transition-colors">
                <X className="w-6 h-6 text-gray-800" />
              </button>
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[9/16]">
                  <iframe width="100%" height="100%" src={videos.find(v => v.id === selectedVideo)?.videoUrl} title="Video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
