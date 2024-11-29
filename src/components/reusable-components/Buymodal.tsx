"use client";

import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    Dialog,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import GradientBorder from "../ui/gradient-border";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CompleteinfoModal from "./CompleteinfoModal";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    padding: '16px',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .MuiAccordionSummary-content`]: {
        marginLeft: 0,
        margin: "12px",
    },
    '& .MuiSvgIcon-root': {
        display: 'none',
    },
    // [`& .${accordionSummaryClasses.content}`]: {
    //     marginLeft: theme.spacing(1),
    // },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const tickets = [
    {
        id: 'panel1',
        title: 'Festival / Multi Day Tickets / Season Passes',
        price: '£40',
        included: ['Queue jump', 'Free food']
    },
    {
        id: 'panel2',
        title: 'RSVP',
        price: '£10',
        deadline: 'Saturday, 17th November 2024',
        capacity: '100 persons',
        included: ['Queue jump', 'Free food']
    },
    {
        id: 'panel3',
        title: 'Private Event',
        price: '£20',
        included: ['Queue jump', 'Free food']
    },
    {
        id: 'panel4',
        title: 'Passworded / Discounted Voucher Event',
        price: '£20',
        included: ['Queue jump', 'Free food']
    }
];

const BuyModal = ({ isOpen, onClose, onNext, setTicketPrice, setTicketType, setTicketIndex }: any) => {
    const [selectedTicket, setSelectedTicket] = useState("");
    const [selectedTicketPrice, setSelectedTicketPrice] = useState(0);
    const [selectedTicketType, setSelectedTIcketType] = useState<any>();
    const [eventid, setEventid] = useState<any>();
    const [expanded, setExpanded] = useState<string | false>('panel1');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompleteInfoModalOpen, setIsCompleteInfoModalOpen] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
            setSelectedTicketId(newExpanded ? panel : null);  // Save the selected ticket ID
        };

    // Example logic for button text
    const getNextButtonText = () => {
        if (selectedTicketId === 'panel2') {
            return "RSVP";
        } else if (selectedTicketId === 'panel1' || selectedTicketId === 'panel3' || selectedTicketId === 'panel4') {
            return "Submit your details";
        }
        return "Buy Ticket";
    };

    const handleNextStep = () => {
        // Hide the current modal
        onClose();
        // Show the next modal
        setIsCompleteInfoModalOpen(true);
    };

    const handleCompleteInfoClose = () => {
        // Close the CompleteInfoModal
        setIsCompleteInfoModalOpen(false);
    };

    // const handleChange =
    //     (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    //         setExpanded(newExpanded ? panel : false);
    //     };

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("Modal isOpen:", isOpen);
    }, [isOpen]);

    const StyledAccordion = styled(Accordion)({
        border: 'none',
    });



    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md lg:max-w-[600px] text-white">
                    <div>
                        <DialogHeader className="">
                            <DialogTitle className="font-extrabold taxt-[20px] md:text-[24px] pb-[20px]">
                                Buy Tickets
                            </DialogTitle>
                            <Separator className="scale--[1.12] bg-[#292929]" />
                        </DialogHeader>

                        <div>
                            <p className="text-[#BFBFBF] text-sm font-extrabold py-[24px]">
                                CHOOSE TICKET TYPE
                            </p>
                            <div className="flex flex-col gap-[12px] mb-[90px]">
                                {tickets.map((ticket) => (
                                    <div key={ticket.id}>
                                        {expanded === ticket.id ? (
                                            <Collapsible className="w-full"
                                            >
                                                <GradientBorder>
                                                    <Accordion className="gradient-slate" sx={{ color: "white" }} expanded={expanded === ticket.id} onChange={handleChange(ticket.id)}>
                                                        <AccordionSummary sx={{ padding: "0px", marginTop: "2px" }} aria-controls={`${ticket.id}-content`} id={`${ticket.id}-header`}>
                                                            <Typography className="flex justify-between w-full" sx={{ fontSize: "16px", fontWeight: 700, fontFamily: "var(--font-base)" }}>
                                                                <p>{ticket.title}</p> <p>{ticket.price}</p>
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <Separator className="scale--[1.12] bg-[#292929]" />
                                                        <AccordionDetails>
                                                            <Typography sx={{ fontFamily: "var(--font-base)" }}>
                                                                {ticket.deadline && (
                                                                    <div>
                                                                        <p className="text-[#8F8F8F] text-[12px] font-extrabold">RSVP Deadline</p>
                                                                        <p className="text-sm font-normal mb-[16px] pt-[12px]">{ticket.deadline}</p>
                                                                    </div>
                                                                )}
                                                                {ticket.capacity && (
                                                                    <div>
                                                                        <p className="text-[#8F8F8F] text-[12px] font-extrabold">RSVP Capacity</p>
                                                                        <p className="text-sm font-normal mb-[16px] pt-[12px]">{ticket.capacity}</p>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <p className="text-[#8F8F8F] text-[12px] font-extrabold">INCLUDED</p>
                                                                    {ticket.included.map((item, index) => (
                                                                        <p key={index} className="text-sm font-normal pt-[6px]">{item}</p>
                                                                    ))}
                                                                </div>
                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </GradientBorder>
                                            </Collapsible>
                                        ) : (
                                            <div className="gradient-slate-input">
                                                <Accordion className="gradient-slate" sx={{ color: "white" }} expanded={expanded === ticket.id} onChange={handleChange(ticket.id)}>
                                                    <AccordionSummary sx={{ padding: "0px", marginTop: "2px" }} aria-controls={`${ticket.id}-content`} id={`${ticket.id}-header`}>
                                                        <Typography className="flex justify-between w-full" sx={{ fontSize: "16px", fontWeight: 700, fontFamily: "var(--font-base)" }}>
                                                            <p>{ticket.title}</p> <p>{ticket.price}</p>
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <Separator className="scale--[1.12] bg-[#292929]" />
                                                    <AccordionDetails>
                                                        <Typography sx={{ fontFamily: "var(--font-base)" }}>
                                                            <div>
                                                                <p className="text-[#8F8F8F] text-[12px] font-extrabold">INCLUDED</p>
                                                                {ticket.included.map((item, index) => (
                                                                    <p key={index} className="text-sm font-normal pt-[6px]">{item}</p>
                                                                ))}
                                                            </div>
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <DialogFooter className="w-full mt-4 pt-4 bg-[#101010] border-t border-muted">
                            <div className="w-full">
                                <div className="pb-4 flex justify-between items-end">
                                    <div>
                                        <span className="text-primary text-sm">Total Price</span>
                                        <p className="font-bold text-2xl">
                                            £{selectedTicketPrice}.00{" "}
                                            <span className="text-[12px] text-[#BFBFBF] font-normal">
                                                inc fees
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    disabled={!expanded}
                                    onClick={handleNextStep}
                                    className="w-full"
                                >
                                    {expanded === "panel2"
                                        ? "RSVP"
                                        : expanded === "panel3" || expanded === "panel4"
                                            ? "Buy"
                                            : "Buy Ticket"}
                                </Button>
                            </div>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
            <CompleteinfoModal
                isOpen={isCompleteInfoModalOpen}
                onClose={handleCompleteInfoClose}
                onNext={handleCompleteInfoClose}
                selectedTicketId={selectedTicketId} // Pass the selected ticket ID
                setTicketPrice={setTicketPrice}
                setTicketType={setTicketType}
                setTicketIndex={setTicketIndex}
            />
        </>
    );
};

export default BuyModal;
