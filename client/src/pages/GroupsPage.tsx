import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { fetchGroups, createGroup } from "@/api/group.api"
import { createContact } from "@/api/contact.api"
import type { GroupItem } from "@/types/group.type"
import Navbar from "@/components/dashboard/Navbar"

export default function GroupsPage() {
  const [groups, setGroups] = useState<GroupItem[]>([])
  const [expandedGroupIds, setExpandedGroupIds] = useState<string[]>([])
  const [groupName, setGroupName] = useState("")
  const [groupEmails, setGroupEmails] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingGroups, setLoadingGroups] = useState(false)

  const loadGroups = async () => {
    try {
      setLoadingGroups(true)
      const result = await fetchGroups()
      setGroups(result || [])
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unable to load groups")
    } finally {
      setLoadingGroups(false)
    }
  }

  const toggleGroupExpanded = (groupId: string) => {
    setExpandedGroupIds((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId]
    )
  }

  useEffect(() => {
    loadGroups()
  }, [])

  const handleCreateGroup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = groupName.trim()
    if (!trimmedName) {
      toast.error("Group name cannot be empty")
      return
    }

    const emails = groupEmails
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)
    const uniqueEmails = Array.from(new Set(emails))

    try {
      setLoading(true)
      const group = await createGroup({ name: trimmedName })

      if (uniqueEmails.length > 0) {
        await Promise.all(
          uniqueEmails.map((email) =>
            createContact({
              name: email.split("@")[0],
              email,
              groupId: group.id,
            })
          )
        )
      }

      toast.success("Group created successfully")
      setGroupName("")
      setGroupEmails("")
      await loadGroups()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Unable to create group")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-10 pb-12">
        <div className="rounded-3xl border bg-white p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Organize your contact lists
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Build groups, review members, and keep your outreach organized.
              </p>
            </div>
            <div className="rounded-3xl bg-muted px-4 py-3 text-sm text-muted-foreground">
              {groups.length} group{groups.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[360px_1fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border bg-white p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold tracking-tight">
                  Create Group
                </h3>
              </div>

              <form onSubmit={handleCreateGroup} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Group name</label>
                  <Input
                    value={groupName}
                    onChange={(event) => setGroupName(event.target.value)}
                    placeholder="Marketing list"
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email addresses</label>
                  <Textarea
                    value={groupEmails}
                    onChange={(event) => setGroupEmails(event.target.value)}
                    placeholder="musa@gmail.com, ahmed@gmail.com"
                    rows={5}
                    className="rounded-2xl"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate multiple emails with commas. Each entry becomes one
                    contact in the group.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-2xl"
                >
                  {loading ? "Saving..." : "Create Group"}
                </Button>
              </form>
            </div>
          </section>

          <section>
            <div className="rounded-2xl border bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Groups</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your contact groups.
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                  {groups.reduce(
                    (count, group) => count + (group.contacts?.length ?? 0),
                    0
                  )}{" "}
                  contacts
                </span>
              </div>

              {loadingGroups ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  Loading groups...
                </div>
              ) : groups.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No groups found.
                </div>
              ) : (
                <div className="space-y-3">
                  {groups.map((group) => {
                    const expanded = expandedGroupIds.includes(group.id)

                    return (
                      <div
                        key={group.id}
                        className="overflow-hidden rounded-xl border"
                      >
                        <button
                          type="button"
                          onClick={() => toggleGroupExpanded(group.id)}
                          className="flex w-full items-center justify-between px-4 py-3 hover:bg-slate-50"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium capitalize">
                              {group.name}
                            </span>

                            <span className="text-sm text-muted-foreground">
                              {group.contacts?.length ?? 0} contacts
                            </span>
                          </div>

                          <svg
                            className={`h-4 w-4 transition-transform ${
                              expanded ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.12l3.71-3.89a.75.75 0 111.08 1.04l-4.25 4.46a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {expanded && (
                          <div className="border-t bg-slate-50 px-4 py-3">
                            <ul className="space-y-2">
                              {(group.contacts ?? []).map((contact) => (
                                <li
                                  key={contact.id}
                                  className="text-sm text-slate-700"
                                >
                                  {contact.email}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
