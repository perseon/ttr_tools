meta:
  id: lip
  file-extension: lip
seq:
  - id: adaptation
    type: u2be
  - id: cm_pdu
    type: u1
  - id: source_issi
    type: b24
  - id: destination_issi
    type: b24
  - id: protocol
    type: u1
  - id: sds_type
    type: b3
  - id: ss
    type: b1
  - id: reserved
    type: b4
  - id: msg_reference
    type: u1
  - id: area_selection
    type: u1
  - id: tl_length
    type: u2be
  - id: tl_pdu
    type: u1
  - id: pdu_type
    type: b2
  - id: time_elapsed
    type: b2
  - id: longitude
    type: b25
  - id: latitude
    type: b24
  - id: position_error
    type: b3
  - id: horizontal_velocity
    type: b7
  - id: direction_of_travel
    type: b4
  - id: aditional_data
    type: b1
  - id: reason_sending
    type: b8
    if: aditional_data == false
  - id: user_defined_data
    type: b8
    if: aditional_data == true