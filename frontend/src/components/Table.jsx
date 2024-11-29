import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const invoices = [
    {
        id: "INV001",
        title: "Paid",
        description: "$250.00",
        price: "Credit Card",
        category: "Credit Card",
        sold: "Credit Card",
        image: "Credit Card",
    },
    {
        id: "INV001",
        title: "Paid",
        description: "$250.00",
        price: "Credit Card",
        category: "Credit Card",
        sold: "Credit Card",
        image: "Credit Card",
    },
    {
        id: "INV001",
        title: "Paid",
        description: "$250.00",
        price: "Credit Card",
        category: "Credit Card",
        sold: "Credit Card",
        image: "Credit Card",
    },
    {
        id: "INV001",
        title: "Paid",
        description: "$250.00",
        price: "Credit Card",
        category: "Credit Card",
        sold: "Credit Card",
        image: "Credit Card",
    },
    {
        id: "INV001",
        title: "Paid",
        description: "$250.00",
        price: "Credit Card",
        category: "Credit Card",
        sold: "Credit Card",
        image: "Credit Card",
    },
    {
        id: "INV001",
        title: "Paid",
        description: "$250.00",
        price: "Credit Card",
        category: "Credit Card",
        sold: "Credit Card",
        image: "Credit Card",
    },
    {
        id: "INV001",
        title: "Paid",
        description: "$250.00",
        price: "Credit Card",
        category: "Credit Card",
        sold: "Credit Card",
        image: "Credit Card",
    },
]

export function TableComponent({ transitions }) {
    return (
        <Table>
            <TableCaption>A list of your Transactions.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[30px]">id</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Category</TableHead>
                    <TableHead className="text-right">Sold</TableHead>
                    <TableHead className="text-right">Image</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transitions.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.title}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell className="text-right">{invoice.price}</TableCell>
                        <TableCell className="text-right">{invoice.category}</TableCell>
                        <TableCell className="text-right">{invoice.sold?'Sold':'Not sold'}</TableCell>
                        <TableCell className="text-right">{invoice.image}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
