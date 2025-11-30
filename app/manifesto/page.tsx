import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/pixelact-ui/dialog";
import { Button } from "@/components/ui/pixelact-ui/button";

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
            <div className="flex flex-wrap gap-6 justify-center d">
                <div className="flex flex-col items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <span className="font-semibold mb-2 hover:text-pink-500 hover:bg-yellow-200 cursor-pointer">Damian</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>This is Damian</DialogTitle>
                        <DialogDescription>
                            He plays guitar.
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
                <img src="/wanted/damian_rotated_pixelated.gif" alt="Damian" className="w-50 h-full object-contain"/>
                </div>

                <div className="flex flex-col items-center">
                
                <Dialog>
                    <DialogTrigger asChild>
                        <span className="font-semibold mb-2 hover:text-pink-500 hover:bg-yellow-200 cursor-pointer">Marcus</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>This is Marcus</DialogTitle>
                        <DialogDescription>
                            He shouts.
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
                <img src="/wanted/marcus_rotated_pixelated.gif" alt="Marcus" className="w-50 h-full object-contain"/>
                </div>
            </div>
            <br/>
            <div className="flex flex-wrap gap-6 justify-center">
                <div className="flex flex-col items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <span className="font-semibold mb-2 hover:text-pink-500 hover:bg-yellow-200 cursor-pointer">Oli</span>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>This is Oli</DialogTitle>
                            <DialogDescription>
                                He plays drums.
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                    <img
                    src="/wanted/oli_rotated_pixelated.gif"
                    alt="Oli"
                    className="w-50 h-full object-contain border-4 border-gray-300 hover:border-pink-500 transition-colors duration-300"
                />
                </div>

                <div className="flex flex-col items-center">
                
                <Dialog>
                    <DialogTrigger asChild>
                        <span className="font-semibold mb-2 hover:text-pink-500 hover:bg-yellow-200 cursor-pointer">Taylor</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>This is Taylor</DialogTitle>
                        <DialogDescription>
                            He plays bass.
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
                <img
                    src="/wanted/taylor_rotated_pixelated.gif"
                    alt="Taylor"
                    className="w-50 h-full object-contain border-4 border-gray-300 hover:border-pink-500 transition-colors duration-300"
                />
                </div>
            </div>
        </div>
        
    );
}