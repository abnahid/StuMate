import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { FileImage, FileText, Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import { cn } from '../../../../lib/utils';

const Milestone = ({ day, title, tasks, tip, isVisible }) => (
    <div
        className={cn(
            "p-4 rounded-lg bg-card shadow-lg border border-border w-[90%] transition-opacity duration-700",
            isVisible ? "opacity-100" : "opacity-0"
        )}
    >
        <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
            Step {day}
        </div>
        <h3 className="font-bold text-lg mb-4">{title}</h3>

        {/* Tasks as bullet points */}
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            {tasks.map((task, idx) => (
                <li key={idx}>{task}</li>
            ))}
        </ul>

        {/* Tip section */}
        {tip && (
            <div className="mt-4 p-3 rounded-lg bg-muted text-sm text-muted-foreground italic border-l-4 border-primary flex items-center gap-2">
                <Lightbulb />
                <div><span className="font-medium">Tip:</span> {tip}</div>

            </div>
        )}
    </div>
);



const MilestoneListItem = ({ item, index }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <li ref={ref} className="relative pl-12 md:pl-0 pb-12">
            <div className="absolute left-6 md:left-1/2 w-0.5 h-full bg-border -translate-x-1/2"></div>

            <div className="absolute left-6 md:left-1/2 top-1 w-4 h-4 bg-primary rounded-full border-4 border-card -translate-x-1/2"></div>

            <div
                className={cn(
                    "relative md:flex",
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                )}
            >
                <div
                    className={cn(
                        "md:w-1/2",
                        index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    )}
                >
                    <Milestone {...item} isVisible={isVisible} />
                </div>
            </div>
        </li>
    );
};

export function RoadmapDisplay({ roadmapData, onTryAgain }) {
    const { roadmap, objective } = roadmapData;
    const printRef = useRef();
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async (format) => {
        setIsExporting(true);
        const input = printRef.current;
        if (!input) {
            setIsExporting(false);
            return;
        }

        try {
            const dataUrl = await toPng(input, {
                quality: 1.0,
                pixelRatio: 2,
                style: {
                    height: `${input.scrollHeight}px`
                }
            });

            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const filename = `stumate-study-path-${timestamp}`;

            if (format === 'pdf') {
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (input.scrollHeight * pdfWidth) / input.scrollWidth;
                pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${filename}.pdf`);
            } else {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${filename}.png`;
                link.click();
            }
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };


    return (
        <Card className="w-full max-w-6xl mx-auto overflow-hidden">
            <div ref={printRef} className="bg-background">
                <CardHeader className="text-center p-8">
                    <img src="/assets/Image/logo.svg" alt="Stumate Logo" className="mx-auto h-16 mb-4" />
                    <CardTitle className="text-3xl font-bold mt-2">{objective}</CardTitle>
                    <CardDescription>Your personalized step-by-step guide.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-8">
                    <ul className="relative">
                        {roadmap.map((item, index) => (
                            <MilestoneListItem key={item.day} item={item} index={index} />
                        ))}
                    </ul>
                </CardContent>
            </div>
            <CardFooter className="flex-col gap-4 border-t bg-background p-6">
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button onClick={() => handleExport('pdf')} variant="outline" disabled={isExporting}>
                        {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                        Export as PDF
                    </Button>
                    <Button onClick={() => handleExport('png')} variant="outline" disabled={isExporting}>
                        {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileImage className="mr-2 h-4 w-4" />}
                        Export as Image
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