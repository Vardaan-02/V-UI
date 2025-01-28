import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Props {
  name: string
  type: string
  required: boolean
  default: string
  description: string
}

interface BeautifulPropsTableProps {
  props: Props[]
  title?: string
}

export default function BeautifulPropsTable({ props, title = "Props" }: BeautifulPropsTableProps) {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <ScrollArea className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="w-[100px] text-center">Type</TableHead>
              <TableHead className="w-[100px] text-center">Required</TableHead>
              <TableHead className="w-[100px] text-center">Default</TableHead>
              <TableHead className="text-right">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.map((prop) => (
              <TableRow key={prop.name} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{prop.name}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="">{prop.type}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  {prop.required ? <Badge variant="destructive">Yes</Badge> : <Badge variant="secondary">No</Badge>}
                </TableCell>
                <TableCell className="text-center w-36">{prop.default ? prop.default : "-"}</TableCell>
                <TableCell className="text-right">{prop.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}

