export default function ManifestoPage() {
    return (
        <div className="p-6 bg-white text-black min-h-screen flex flex-col">
            <h1 className="text-4xl font-bold">Manifesto</h1>
            <br/>
            <p>
                Punk isn't dead...
            </p>
            <br/>
            <p>
                It's alive in the sounds of Balloon Tomb...
            </p>
            <br/>
            {/* Row of GIFs */}
            <div className="flex flex-wrap gap-6 justify-start">
                {/* Single GIF + Title */}
                <div className="flex flex-col items-center">
                <span className="font-semibold mb-2">Damian</span>
                <img src="/wanted/damian_rotated_pixelated.gif" alt="Damian" className="w-50 h-full object-contain"/>
                </div>

                <div className="flex flex-col items-center">
                <span className="font-semibold mb-2">Marcus</span>
                <img src="/wanted/marcus_rotated_pixelated.gif" alt="Marcus" className="w-50 h-full object-contain"/>
                </div>

                <div className="flex flex-col items-center">
                <span className="font-semibold mb-2">Oli</span>
                <img src="/wanted/oli_rotated_pixelated.gif" alt="Oli" className="w-50 h-full object-contain"/>
                </div>

                <div className="flex flex-col items-center">
                <span className="font-semibold mb-2">Taylor</span>
                <img src="/wanted/taylor_rotated_pixelated.gif" alt="Taylor" className="w-50 h-full object-contain"/>
                </div>
            </div>

        </div>
    );
}