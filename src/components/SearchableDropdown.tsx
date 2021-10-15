import React, { useState } from "react"
import { FormControl } from "react-bootstrap"

const SearchableDropdown = React.forwardRef(
    // @ts-ignore
    // eslint-disable-next-line react/prop-types
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("")

        return (
            <div
                // @ts-ignore
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            // @ts-ignore
                            !value || child.props.children.props.children[1].props.children.join("").toLowerCase().includes(value)
                    )}
                </ul>
            </div>
        )
    }
)
SearchableDropdown.displayName = "SearchableDropdown"

export default SearchableDropdown
