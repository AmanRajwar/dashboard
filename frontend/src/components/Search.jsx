import React from 'react';
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from './ui/input';

const SearchComponent = ({ selectedMonth, setSelectedMonth, setSearchQuery, searchQuery, handleSearch }) => {
    return (
        <div className="flex justify-between gap-4 mb-2 w-full">
            {/* Search Input */}
            <Input
                type="text" // change type to "text" for general search functionality
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // handle search query change
            />

            {/* Month Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{selectedMonth} <ChevronDown /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                        {/* Month Selection Items */}
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'december'].map((month) => (
                            <DropdownMenuItem key={month} onClick={() => setSelectedMonth(month)}>
                                <Calendar />
                                <span>{month.charAt(0).toUpperCase() + month.slice(1)}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Button */}
            <Button
                className="tracking-widest"
                onClick={handleSearch} // Pass the function reference (no parentheses)
            >
                Search
            </Button>
        </div>
    );
};

export default SearchComponent;
