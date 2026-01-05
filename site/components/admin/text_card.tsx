"user client";

import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from "@/components/ui/pixelact-ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/pixelact-ui/dialog";

interface TextCardProps {
    data: {
        id: number,
        message: string,
        created_at: string
    };
    onCopy?: (text: string) => void;
}

export function TextCard({ data, onCopy }: TextCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    }

    return (
        <Card className="border-4 border-gray-300 hover:border-pink-500 transition-colors duration-300">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">Submission #{data.id}</CardTitle>
                        <CardDescription>
                            {formatDate(data.created_at)}
                        </CardDescription>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        #{data.id}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="bg-gray-50 p-3 rounded-md max-h-40 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap break-words">
                        {data.message.length > 150 
                        ? `${data.message.substring(0, 150)}...` 
                        : data.message}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCopy?.(data.message)}
                >
                    Copy Text
                </Button>
                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger>
                            <Button>
                                Full text
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>
                                Submission #{data.id}
                            </DialogTitle>
                            <DialogDescription>
                                {data.message}
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardFooter>
        </Card>
    );
} 