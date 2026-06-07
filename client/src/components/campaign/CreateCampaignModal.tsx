import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { createCampaign } from "@/api/campaign.api"
import { fetchGroups } from "@/api/group.api"
import { Checkbox } from "../ui/checkbox"
import type { GroupItem } from "@/types/group.type"

type Props = {
  openCampaignModal: boolean
  setOpenCampaignModal(openCampaignModal: boolean): void
}

export default function CreateCampaignDialog({
  openCampaignModal,
  setOpenCampaignModal,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [groups, setGroups] = useState<GroupItem[]>([])

  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [scheduledAt, setScheduledAt] = useState("")
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])

  const getMinDatetimeLocal = () => {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const isFutureDateString = (value: string) => {
    const date = new Date(value)
    return !isNaN(date.getTime()) && date.getTime() > Date.now()
  }

  const loadGroups = async () => {
    try {
      const result = await fetchGroups()
      setGroups(result || [])
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unable to load groups")
    }
  }

  useEffect(() => {
    if (openCampaignModal) {
      loadGroups()
    }
  }, [openCampaignModal])

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroups((prev) => {
      if (prev.includes(groupId)) {
        return prev.filter((id) => id !== groupId)
      }

      return [...prev, groupId]
    })
  }

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      // Validate scheduledAt is in the future when provided
      if (scheduledAt && !isFutureDateString(scheduledAt)) {
        toast.error("Scheduled time must be in the future")
        setLoading(false)
        return
      }

      const payload = {
        subject,
        body,
        scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null,
        groupIds: selectedGroups,
      }

      await createCampaign(payload)
      toast.success("Campaign created successfully")
      setOpenCampaignModal(false)

      // reset form
      setSubject("")
      setBody("")
      setScheduledAt("")
      setSelectedGroups([])
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create campaign")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={openCampaignModal} onOpenChange={setOpenCampaignModal}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-3xl p-0">
        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl">Create Campaign</DialogTitle>

            <DialogDescription>
              Select one or more groups and send a clear campaign message.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateCampaign} className="space-y-5">
            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter campaign subject"
                className="h-11 rounded-xl"
              />
            </div>

            {/* Body */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Body</label>
              <Textarea
                rows={7}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your email body..."
                className="rounded-2xl"
              />
            </div>

            {/* Groups */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Select Groups</label>

              <div className="grid grid-cols-2 gap-3">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center space-x-3 rounded-xl border px-4 py-3"
                  >
                    <Checkbox
                      checked={selectedGroups.includes(group.id)}
                      onCheckedChange={() => handleGroupSelect(group.id)}
                    />

                    <label className="text-sm font-medium">{group.name}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Schedule Time (Optional)
              </label>

              <Input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="h-11 rounded-xl"
                  min={getMinDatetimeLocal()}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => setOpenCampaignModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="rounded-xl">
                {loading ? "Sending..." : "Send Campaign"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
