"use client";

import { GuestStatistics, GuestActivity } from "@/features/guest/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle2, UserCheck, Clock, RefreshCw } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface GuestDashboardProps {
  statistics: GuestStatistics;
  activities: GuestActivity[];
}

export function GuestDashboard({ statistics, activities }: GuestDashboardProps) {
  // Data for RSVP Chart
  const rsvpData = [
    { name: "Accepted", value: statistics.confirmed, color: "#10b981" },
    { name: "Pending", value: statistics.pending, color: "#f59e0b" },
    { name: "Declined", value: statistics.declined, color: "#ef4444" },
  ].filter((d) => d.value > 0); // Hide empty sectors

  // Data for Attendance Bar Chart
  const attendanceData = [
    {
      name: "Attendance",
      CheckedIn: statistics.checkedIn,
      NotArrived: statistics.notArrived,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invited</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.invited}</div>
            <p className="text-xs text-muted-foreground">
              {statistics.totalPax} pax total capacity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.acceptanceRate}%</div>
            <p className="text-xs text-muted-foreground">{statistics.confirmed} accepted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RSVP Rate</CardTitle>
            <RefreshCw className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.rsvpRate}%</div>
            <p className="text-xs text-muted-foreground">Responded to invitations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">{statistics.checkedIn} checked in</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Charts */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview Metrics</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="w-full h-[250px] flex-1">
              <h4 className="text-sm font-medium text-center mb-2">RSVP Distribution</h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rsvpData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {rsvpData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full h-[250px] flex-1">
              <h4 className="text-sm font-medium text-center mb-2">Attendance Progress</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="CheckedIn" stackId="a" fill="#3b82f6" name="Checked In" />
                  <Bar dataKey="NotArrived" stackId="a" fill="#e2e8f0" name="Not Arrived" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {activities.length > 0 ? (
                activities.map((activity, i) => (
                  <div className="flex items-center" key={i}>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {new Date(activity.timestamp).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground text-center py-8">
                  No recent activity
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
