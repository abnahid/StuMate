import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { Check, FileImage, FileText, Lightbulb, Loader2, Route, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import { cn } from '../../../../lib/utils';

const Milestone = ({ day, title, tasks, tip, alignment = 'left' }) => (
    <div className={cn("flex w-full items-center", alignment === 'right' ? 'flex-row-reverse justify-end' : 'flex-row justify-start')}>
        {/* Card Side */}
        <div className="w-1/2">
            <div className={cn("p-4", alignment === 'right' ? 'pr-8' : 'pl-8')}>
                <div className="bg-background border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow space-y-3">
                    <h3 className="font-bold text-primary text-lg">{title}</h3>
                    <ul className="space-y-1.5">
                        {tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                <span>{task}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex items-start gap-2 rounded-md border bg-muted/50 p-3 text-sm">
                        <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                        <div className="flex-1">
                            <span className="font-semibold">Tip: </span>{tip}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Connector Side */}
        <div className="relative w-1/2 flex items-center justify-center">
            {/* Horizontal Line */}
            <div className={cn("absolute top-1/2 -translate-y-1/2 h-[2px] w-full bg-primary/50", alignment === 'left' ? 'left-0' : 'right-0')}></div>
            {/* Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full border-4 border-background shadow flex items-center justify-center font-bold text-sm">
                {day}
            </div>
        </div>
    </div>
);

const Road = () => (
    <div className="w-full h-12 flex justify-center">
        <div className="w-[2px] h-full bg-primary/50"></div>
    </div>
);


export function RoadmapDisplay({ roadmapData, onTryAgain }) {
    const { roadmap, objective } = roadmapData;
    const printRef = useRef();
    const [isExportingPdf, setIsExportingPdf] = useState(false);
    const [isExportingImage, setIsExportingImage] = useState(false);

    const slugify = (text) => {
        if (!text) return 'stumate-study-path';
        return text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    const handleExport = async (format) => {
        const input = printRef.current;
        try {
            const imgData = await toPng(input, { cacheBust: true }); // handles modern CSS colors

            if (format === 'pdf') {
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (input.offsetHeight * pdfWidth) / input.offsetWidth;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('stumate-study-path.pdf');
            } else {
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'stumate-study-path.png';
                link.click();
            }
        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    const isExporting = isExportingPdf || isExportingImage;

    return (
        <Card className="max-w-6xl mx-auto">
            <CardHeader className="text-center">
                <Route className="mx-auto h-10 w-10 text-primary" />
                <CardTitle className="text-3xl">Your Personalized Study Path</CardTitle>
                <CardDescription>Follow this plan to achieve your goal: <strong>{objective}</strong></CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-4 bg-muted/20">
                <div ref={printRef} className="bg-background p-4 sm:p-8 text-foreground rounded-lg">
                    <div className="text-center mb-12 flex items-center justify-center gap-3">
                        <img src="/assets/Image/StuMate-1.png" alt="Stumate Logo" className="object-contain h-10 w-10" />
                        <h2 className="text-3xl font-bold">Stumate Study Plan</h2>
                    </div>
                    <div className="relative">
                        <div className="absolute h-full w-[2px] bg-primary/50 top-0 left-1/2 -translate-x-1/2"></div>

                        <div className="flex flex-col items-center">
                            {roadmap.map((item, index) => (
                                <div key={item.day} className="w-full">
                                    <Milestone {...item} alignment={index % 2 === 0 ? 'right' : 'left'} />
                                    {index < roadmap.length - 1 && <Road />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4 border-t pt-6">
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button onClick={() => handleExport('pdf')} variant="outline" disabled={isExporting}>
                        {isExportingPdf ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                        {isExportingPdf ? 'Exporting...' : 'Export as PDF'}
                    </Button>
                    <Button onClick={() => handleExport('image')} variant="outline" disabled={isExporting}>
                        {isExportingImage ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileImage className="mr-2 h-4 w-4" />}
                        {isExportingImage ? 'Exporting...' : 'Export as Image'}
                    </Button>
                </div>
                <Button onClick={onTryAgain} className="w-full md:w-auto" disabled={isExporting}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Another Plan
                </Button>
            </CardFooter>
        </Card>
    );
}
