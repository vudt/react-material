import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

class AutocompleteComponent extends Component {

    constructor(props) {
        super(props)
    }

    prepare_data() {
        const suggestions = [
            { id: 1, label: 'Afghanistan' },
            { id: 2, label: 'Aland Islands' },
            { id: 3, label: 'Albania' },
            { id: 4, label: 'Algeria' },
            { id: 5, label: 'American Samoa' },
            { id: 6, label: 'Andorra' },
            { id: 7, label: 'Angola' },
            { id: 8, label: 'Anguilla' },
            { id: 9, label: 'Antarctica' },
            { id: 10, label: 'Antigua and Barbuda' },
            { id: 11, label: 'Argentina' },
            { id: 12, label: 'Armenia' },
            { id: 13, label: 'Aruba' },
            { id: 14, label: 'Australia' },
            { id: 15, label: 'Austria' },
            { id: 16, label: 'Azerbaijan' },
            { id: 17, label: 'Bahamas' },
            { id: 18, label: 'Bahrain' },
            { id: 19, label: 'Bangladesh' },
            { id: 20, label: 'Barbados' },
            { id: 21, label: 'Belarus' },
            { id: 22, label: 'Belgium' },
            { id: 23, label: 'Belize' },
            { id: 24, label: 'Benin' },
            { id: 25, label: 'Bermuda' },
            { id: 26, label: 'Bhutan' },
            { id: 27, label: 'Bolivia, Plurinational State of' },
            { id: 28, label: 'Bonaire, Sint Eustatius and Saba' },
            { id: 29, label: 'Bosnia and Herzegovina' },
            { id: 30, label: 'Botswana' },
            { id: 31, label: 'Bouvet Island' },
            { id: 32, label: 'Brazil' },
            { id: 33, label: 'British Indian Ocean Territory' },
            { id: 34, label: 'Brunei Darussalam' },
        ];
        return suggestions;
    }

    renderInput(inputProps) {
        const { InputProps, ref, ...other } = inputProps;
        return (
            <TextField
                InputProps={
                    {
                        inputRef: ref,
                        ...inputProps,
                    }
                }
                {...other}
                InputLabelProps={{ shrink: true }}
            />
        )
    }

    getSuggestions(value, { showEmpty = false } = {}) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        return inputLength === 0 && !showEmpty
            ? []
            : this.prepare_data().filter(suggestion => {
                const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
                if (keep) {
                    count += 1;
                }
                return keep;
            });
    }

    renderSuggestion(suggestionProps) {
        const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
        const isHighlighted = highlightedIndex === index;
        const isSelected = ('').indexOf(suggestion.label) > -1;
        return (
            <MenuItem
                {...itemProps}
                key={suggestion.id}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 600 : 400,
                }}
            >
                {suggestion.label}
            </MenuItem>
        )
    }

    handleChange(selection) {
        console.log(selection);
    }

    render() {
        return (
            <Container>
                <h3>Autocomplete</h3>
                <Downshift
                    onChange={item => this.handleChange(item)}
                    itemToString={item => (item ? item.label : '')}
                >
                    {
                        ({
                            getInputProps,
                            getItemProps,
                            getLabelProps,
                            getMenuProps,
                            isOpen,
                            inputValue,
                            highlightedIndex,
                            selectedItem,
                        }) => {
                            const { onBlur, onFocus, ...inputProps } = getInputProps({
                                placeholder: 'Search for a country (start with a)'
                            });
                            return (
                                <div>
                                    {
                                        this.renderInput({
                                            fullWidth: true,
                                            label: 'Country',
                                            inputprops: { onBlur, onFocus },
                                            inputProps
                                        })
                                    }

                                    <div {...getMenuProps()}>
                                        {isOpen ? (
                                            <Paper className="square">
                                                {
                                                    this.getSuggestions(inputValue).map((suggestion, index) =>
                                                        this.renderSuggestion({
                                                            suggestion,
                                                            index,
                                                            itemProps: getItemProps({ item: suggestion }),
                                                            highlightedIndex,
                                                            selectedItem
                                                        })
                                                    )
                                                }
                                            </Paper>
                                        ) : null}
                                    </div>
                                </div>
                            )
                        }
                    }
                </Downshift>
            </Container>
        )
    }
}

export default AutocompleteComponent