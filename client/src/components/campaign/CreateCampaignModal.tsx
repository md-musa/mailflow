import { useState } from "react"

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
import { api } from "@/api/axios"
import { toast } from "sonner"
import { createCampaign } from "@/api/campaign.api"

type Props = {
  openCampaignModal: boolean
  setOpenCampaignModal(openCampaignModal: boolean): void
}

const groups = [
  {
    id: "1",
    name: "CSE Students",
  },

  {
    id: "2",
    name: "Teachers",
  },

  {
    id: "3",
    name: "Club Members",
  },
]

export default function CreateCampaignDialog({
  openCampaignModal,
  setOpenCampaignModal,
}: Props) {
  const [loading, setLoading] = useState(false)

  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [additionalEmails, setAdditionalEmails] = useState("")
  const [scheduledAt, setScheduledAt] = useState("")
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])

  //   const handleGroupSelect = (groupId: string) => {
  //     setSelectedGroups((prev) => {
  //       if (prev.includes(groupId)) {
  //         return prev.filter((id) => id !== groupId)
  //       }

  //       return [...prev, groupId]
  //     })
  //   }

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const emails = additionalEmails
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean)

      const payload = {
        subject,
        body,
        additionalEmails: emails,
        scheduledAt: scheduledAt || null,
      }

      await createCampaign(payload)
      toast.success("Campaign created successfully")
      setOpenCampaignModal(false)

      // reset form
      setSubject("")
      setBody("")
      setAdditionalEmails("")
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
              Send emails to campaign recipients.
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
            {/* <div className="space-y-3">
              <label className="text-sm font-medium">Select Groups</label>

              <div className="grid grid-cols-2 gap-3">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center space-x-3 rounded-2xl border p-4"
                  >
                    <Checkbox
                      checked={selectedGroups.includes(group.id)}
                      onCheckedChange={() => handleGroupSelect(group.id)}
                    />

                    <label className="text-sm font-medium">{group.name}</label>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Additional Emails */}
            <div className="space-y-2">
              <label className="text-sm font-medium"> Emails</label>

              <Input
                value={additionalEmails}
                onChange={(e) => setAdditionalEmails(e.target.value)}
                placeholder="abc@gmail.com, xyz@gmail.com"
                className="h-11 rounded-xl"
              />

              <p className="text-xs text-muted-foreground">
                Separate multiple emails with commas.
              </p>
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
