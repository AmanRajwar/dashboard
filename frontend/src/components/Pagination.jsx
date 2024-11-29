import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    // Helper function to generate pagination items dynamically
    const getPaginationItems = () => {
        const pages = [];

        // Add first page if necessary
        if (currentPage > 2) {
            pages.push(1);
        }

        // Add ellipsis before the current range if needed
        if (currentPage > 3) {
            pages.push("...");
        }

        // Add current page and neighbors
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
            pages.push(i);
        }

        // Add ellipsis after the current range if needed
        if (currentPage < totalPages - 2) {
            pages.push("...");
        }

        // Add last page if necessary
        if (currentPage < totalPages - 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const paginationItems = getPaginationItems();

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    {/* Previous Button */}
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(currentPage - 1);
                                }}
                            />
                        </PaginationItem>
                    )}

                    {/* Dynamic Pagination Links */}
                    {paginationItems.map((item, index) => (
                        <PaginationItem key={index}>
                            {item === "..." ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    href="#"
                                    isActive={item === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onPageChange(item);
                                    }}
                                >
                                    {item}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* Next Button */}
                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(currentPage + 1);
                                }}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationComponent;
