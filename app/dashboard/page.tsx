"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Phone, Clock, MapPin, Wrench, AlertCircle, CheckCircle, XCircle, Clock3 } from "lucide-react"

interface Enquiry {
  id: string
  call_id: string
  caller_name: string
  caller_number: string
  job_type: string
  postcode: string
  urgency: "low" | "medium" | "high" | "emergency"
  status: "new" | "accepted" | "declined" | "completed"
  duration_seconds: number
  transcript: string
  created_at: string
}

const MOCK_ENQUIRIES: Enquiry[] = [
  {
    id: "1",
    call_id: "call_abc123",
    caller_name: "Sarah Jenkins",
    caller_number: "+44 7700 900001",
    job_type: "Plumbing",
    postcode: "SW1A 1AA",
    urgency: "emergency",
    status: "new",
    duration_seconds: 145,
    transcript: "Hi, I have a burst pipe under the kitchen sink and water is everywhere. I need someone urgently.",
    created_at: "2026-05-04T08:30:00Z",
  },
  {
    id: "2",
    call_id: "call_def456",
    caller_name: "Mike Thompson",
    caller_number: "+44 7700 900002",
    job_type: "Heating",
    postcode: "M1 1AA",
    urgency: "high",
    status: "accepted",
    duration_seconds: 210,
    transcript: "My boiler is making a loud banging noise and the heating isn't working properly. Can you come tomorrow?",
    created_at: "2026-05-04T07:15:00Z",
  },
  {
    id: "3",
    call_id: "call_ghi789",
    caller_name: "Emma Wilson",
    caller_number: "+44 7700 900003",
    job_type: "Electrical",
    postcode: "B1 1AA",
    urgency: "medium",
    status: "completed",
    duration_seconds: 98,
    transcript: "I'd like to get a quote for rewiring my living room. No rush, maybe next week.",
    created_at: "2026-05-03T16:45:00Z",
  },
  {
    id: "4",
    call_id: "call_jkl012",
    caller_name: "David Brown",
    caller_number: "+44 7700 900004",
    job_type: "Plumbing",
    postcode: "L1 1AA",
    urgency: "low",
    status: "declined",
    duration_seconds: 67,
    transcript: "I need a new tap fitted in the bathroom. Can you give me a rough price?",
    created_at: "2026-05-03T14:20:00Z",
  },
]

const URGENCY_CONFIG: Record<string, { color: string; icon: React.ReactNode }> = {
  emergency: { color: "destructive", icon: <AlertCircle className="w-3 h-3" /> },
  high: { color: "default", icon: <AlertCircle className="w-3 h-3" /> },
  medium: { color: "secondary", icon: <Clock3 className="w-3 h-3" /> },
  low: { color: "outline", icon: <Clock3 className="w-3 h-3" /> },
}

const STATUS_CONFIG: Record<string, { color: string; icon: React.ReactNode }> = {
  new: { color: "default", icon: <Clock className="w-3 h-3" /> },
  accepted: { color: "secondary", icon: <CheckCircle className="w-3 h-3" /> },
  declined: { color: "destructive", icon: <XCircle className="w-3 h-3" /> },
  completed: { color: "outline", icon: <CheckCircle className="w-3 h-3" /> },
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function DashboardPage() {
  const [enquiries] = useState<Enquiry[]>(MOCK_ENQUIRIES)

  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Enquiries Dashboard</h1>
          <p className="text-white/60">
            Qualified calls captured by your AI voice agent. {enquiries.length} enquiries today.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "New", value: enquiries.filter((e) => e.status === "new").length, icon: <Clock className="w-4 h-4" /> },
            { label: "Accepted", value: enquiries.filter((e) => e.status === "accepted").length, icon: <CheckCircle className="w-4 h-4" /> },
            { label: "Completed", value: enquiries.filter((e) => e.status === "completed").length, icon: <CheckCircle className="w-4 h-4" /> },
            { label: "Total", value: enquiries.length, icon: <Phone className="w-4 h-4" /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
                {stat.icon}
                {stat.label}
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Enquiries Table */}
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/60">Caller</TableHead>
                <TableHead className="text-white/60">Job Type</TableHead>
                <TableHead className="text-white/60">Location</TableHead>
                <TableHead className="text-white/60">Urgency</TableHead>
                <TableHead className="text-white/60">Status</TableHead>
                <TableHead className="text-white/60">Duration</TableHead>
                <TableHead className="text-white/60">Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((enquiry) => (
                <TableRow key={enquiry.id} className="border-white/10">
                  <TableCell>
                    <div className="font-medium">{enquiry.caller_name}</div>
                    <div className="text-white/50 text-xs">{enquiry.caller_number}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-sm">{enquiry.job_type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <MapPin className="w-3.5 h-3.5" />
                      {enquiry.postcode}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={URGENCY_CONFIG[enquiry.urgency]?.color as any} className="gap-1">
                      {URGENCY_CONFIG[enquiry.urgency]?.icon}
                      {enquiry.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_CONFIG[enquiry.status]?.color as any} className="gap-1">
                      {STATUS_CONFIG[enquiry.status]?.icon}
                      {enquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-white/60">
                    {formatDuration(enquiry.duration_seconds)}
                  </TableCell>
                  <TableCell className="text-sm text-white/60">
                    {formatDate(enquiry.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      <Footer />
    </div>
  )
}
