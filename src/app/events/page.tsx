"use client";

import { motion } from "framer-motion";
import { Calendar, Vote, ArrowRight, ArrowLeft, ExternalLink, Sparkles, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardDecoration } from "@/components/modern-ui/card";
import { Button } from "@/components/modern-ui/button";
import { EVENTS_DATA, Event } from "@/data/events";
import Link from "next/link";
import { useState } from "react";
import { EventDetailModal } from "@/components/EventDetailModal";

export default function EventsPage() {
    const featuredEvent = EVENTS_DATA.find(e => e.id === "1") || EVENTS_DATA[0];

    // Categorize events
    const liveEvents = EVENTS_DATA.filter(e => e.status === "live" && e.id !== featuredEvent.id);
    const upcomingEvents = EVENTS_DATA.filter(e => e.status === "upcoming");
    const pastEvents = EVENTS_DATA.filter(e => e.status === "past");

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />

            <div className="relative pt-32 pb-24 px-4 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full -z-10 animate-pulse delay-1000" />

                <div className="max-w-6xl mx-auto space-y-20">
                    {/* Header */}
                    <div className="text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex justify-center mb-8"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-text-tertiary hover:text-primary transition-colors font-black uppercase tracking-[0.3em] text-xs group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Hub
                            </Link>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-black text-text-primary tracking-tight"
                        >
                            Hub <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                                Events
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary font-medium max-w-2xl mx-auto"
                        >
                            The pulse of MultiversX. Discover launches, competitions, and community gatherings.
                        </motion.p>
                    </div>

                    {/* Featured Event: $ONX VOTE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-8 md:p-16 border-border/50 bg-gradient-to-br from-surface/50 to-surface/30 backdrop-blur-xl relative overflow-hidden group">
                            <CardDecoration className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-30" />

                            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                                <div className="w-full lg:w-1/2 space-y-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-widest text-xs">
                                        <Sparkles className="w-4 h-4" />
                                        Active Event
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-5xl md:text-7xl font-black text-text-primary uppercase leading-none">
                                            {featuredEvent.title}
                                        </h2>
                                        <div className="h-2 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
                                    </div>

                                    <p className="text-xl text-text-secondary leading-relaxed font-medium">
                                        {featuredEvent.description}
                                    </p>

                                    <Button
                                        size="lg"
                                        className="rounded-2xl px-12 py-7 text-lg font-bold shadow-2xl shadow-primary/30 group/btn"
                                        onClick={() => handleOpenModal(featuredEvent)}
                                    >
                                        VIEW DETAILS <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                <div className="w-full lg:w-1/2 flex justify-center items-center">
                                    <div className="relative group/icon">
                                        <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full group-hover/icon:bg-primary/30 transition-colors" />
                                        <div className="relative bg-surface/50 backdrop-blur-md border border-white/10 w-48 h-48 md:w-64 md:h-64 rounded-[40px] flex items-center justify-center shadow-2xl transform rotate-3 group-hover:rotate-6 transition-transform">
                                            <Vote className="w-24 h-24 md:w-32 md:h-32 text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Timeline Strategy: Divided by Status */}
                    <div className="space-y-32 pb-24">
                        {/* 1. Live Now Section */}
                        {liveEvents.length > 0 && (
                            <section className="space-y-12">
                                <div className="flex items-center gap-4 px-4">
                                    <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
                                    <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight">Live Now</h3>
                                    <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {liveEvents.map((event, index) => (
                                        <EventCard key={event.id} event={event} index={index} onOpen={() => handleOpenModal(event)} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 2. Upcoming Section */}
                        {upcomingEvents.length > 0 && (
                            <section className="space-y-12">
                                <div className="flex items-center gap-4 px-4">
                                    <Sparkles className="w-6 h-6 text-accent" />
                                    <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight">Upcoming</h3>
                                    <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {upcomingEvents.map((event, index) => (
                                        <EventCard key={event.id} event={event} index={index} onOpen={() => handleOpenModal(event)} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. Past Events Section - Hidden for now as requested */}
                        {/* {pastEvents.length > 0 && (
                            <section className="space-y-12 opacity-70 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                                <div className="flex items-center gap-4 px-4">
                                    <Clock className="w-6 h-6 text-text-tertiary" />
                                    <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight">Past Events</h3>
                                    <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {pastEvents.map((event, index) => (
                                        <EventCard key={event.id} event={event} index={index} onOpen={() => handleOpenModal(event)} />
                                    ))}
                                </div>
                            </section>
                        )} */}
                    </div>
                </div>
            </div>

            <Footer />

            <EventDetailModal
                event={selectedEvent}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}

function EventCard({ event, index, onOpen }: { event: Event, index: number, onOpen: () => void }) {
    const handleAddToCalendar = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const title = encodeURIComponent(event.title);
        const details = encodeURIComponent(event.description);
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
        window.open(googleCalendarUrl, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="p-6 h-full flex flex-col space-y-4 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group relative">
                <CardDecoration className={event.status === 'live' ? "bg-primary/5" : "bg-text-tertiary/5"} />

                <div className="flex justify-between items-start relative z-10">
                    <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${event.status === 'live' ? 'bg-primary/10 text-primary' :
                        event.status === 'upcoming' ? 'bg-accent/10 text-accent' :
                            'bg-text-tertiary/10 text-text-tertiary'
                        }`}>
                        {event.status}
                    </div>
                </div>

                <h4 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors relative z-10">
                    {event.title}
                </h4>

                <p className="text-sm text-text-secondary leading-relaxed flex-grow relative z-10">
                    {event.description}
                </p>

                <div className="pt-4 flex flex-col gap-4 border-t border-border/30 relative z-10">
                    <div className="flex items-center justify-between text-xs font-bold text-text-tertiary uppercase">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {event.date}
                        </div>
                        {event.status !== 'past' && (
                            <button
                                onClick={handleAddToCalendar}
                                className="flex items-center gap-1 hover:text-primary transition-colors"
                                title="Add to Google Calendar"
                            >
                                <Calendar className="w-3 h-3" />
                                + Calendar
                            </button>
                        )}
                    </div>
                    {event.link && (
                        <Button
                            variant="ghost"
                            className="w-full justify-between h-10 px-4 rounded-xl border border-primary/10 hover:border-primary/30 group/link"
                            onClick={onOpen}
                        >
                            <span className="text-xs font-black uppercase tracking-widest">View Details</span>
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Button>
                    )}
                </div>
            </Card>
        </motion.div>
    );
}
