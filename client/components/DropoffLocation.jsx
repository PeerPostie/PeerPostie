import React, { Component} from 'react'
import { connect } from 'react-redux'

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { addDropoffLocation } from '../actions/dropoffLocation'

export class DropoffLocation extends Component {
  constructor (props) {
    super(props)
    this.state = { address: '' }
  }

    handleChange = address => {
      this.setState({ address })
      }

    handleSelect = address => {
      this.setState({ address })
      this.props.addDropoffLocation(address)
    }

    render () {
      return (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'To ...',
                  className: 'location-search-input'
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item'
                      // inline style for demonstration purpose
                      const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                      return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                    })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      )
    }
}

const matchDispatchToProps = {
  addDropoffLocation
}

export default connect(null, matchDispatchToProps)(DropoffLocation)

