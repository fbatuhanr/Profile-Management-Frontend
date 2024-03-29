import React, {useState, useEffect} from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

import {useSelector, useDispatch} from 'react-redux';

import axios from 'axios';

import Swal from 'sweetalert2';

import { Buffer } from 'buffer';


const Profile = () => {

    const userInfo = useSelector(state => state.user_info);
    const dispatch = useDispatch();


    const [isProfilePhotoLoaded, setIsProfilePhotoLoaded] = useState(false);

    const [isHobbiesFetched, setIsHobbiesFetched] = useState(false);

    const [profileForm, setProfileForm] = useState({
        email: "",
        name: "",
        surname: "",
        phoneNumber: "",
        education: "",
        country: "",
        state: "",

        hobbies: []
    });

    const [profilePhoto, setProfilePhoto] = useState(null);

    
    const fetchProfilePhoto = () => {

        axios.get('http://localhost:3001/image', { params: { filterEmail: userInfo.loginEmail } })
        .then(response => {
            console.log("axios image get!:", response);

            if(response.data){

                const img = response.data;
                const imgData = img.img;
    
                const imgContentType = imgData.contentType;
                const binaryImgData = imgData.data.data;
    
                console.log("type:", imgContentType);
                console.log("binary data: ", binaryImgData);
                
                setProfilePhoto(`data:${imgContentType};base64, ${Buffer.from(binaryImgData).toString('base64')}`);
                setIsProfilePhotoLoaded(true);
    
                console.log(profilePhoto);
            }
        })
        .catch(error => {
            console.error('There was an error (Axios get profile image)!', error);
        });
    }
    const fetchProfileData = () => {

        axios.get('http://localhost:3001/profile-form', { params: { email: userInfo.loginEmail } })
        .then(response => {
            console.log("axios get!:", response)

            const {email, name, surname, phoneNumber, education, country, state, hobbies} = response.data;

            setProfileForm({
                ...profileForm,
                email, name, surname, phoneNumber, education, country, state, hobbies
            });
            setIsHobbiesFetched(true);

        })
        .catch(error => {
            console.error('There was an error (Axios get form data)!', error);
        });
    }

    useEffect(() => {

        fetchProfilePhoto();
        fetchProfileData();
    }, []);


    const changeProfileForm = (e) => setProfileForm({...profileForm, [e.target.name]: e.target.value});
    const changePhoneNumber = (val) => setProfileForm({...profileForm, "phoneNumber": val});
    const changeHobbies = (val) => setProfileForm({...profileForm, "hobbies": val});
    

    

    const profileFormSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "Your profile information will be updated!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.isConfirmed) {

              console.log(profileForm);

              const {email, name, surname, phoneNumber, education, country, state, hobbies} = profileForm;
      
              const rememberMe = true;
              //dispatch({type: "PROFILE_UPDATE", payload: profileForm});
              // userInfo.loginEmail
              const body = {
                  "filterEmail": userInfo.loginEmail,
                  "email": email,
                  "name": name,
                  "surname": surname,
                  "phoneNumber": phoneNumber,
                  "education": education,
                  "country": country,
                  "state": state,
                  "hobbies": hobbies
              };
              console.log("body:", body);
              const headers = {'Content-Type': 'application/json'};
              axios.post('http://localhost:3001/profile-form', body, { headers })
              .then(response => {
                  console.log(response);
      
                  if(response.data.isUpdateSuccess) {
                      const storageValues = { isLoggedIn: true, loginEmail: email }
                      dispatch({type: "LOG_IN", payload: storageValues});
                      
                                
                        Swal.fire(
                            'Updated!',
                            'Profile Form Successfully Updated!',
                            'success'
                        )
            
                  }
                  else {

                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.errorMessage,
                        footer: '<a href="">Why do I have this issue?</a>'
                      })
                  }
              })
              .catch(error => {
                  console.log("err:",error);

                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
              });
            }
          })
    }

    const changeProfilePhoto = (e) => {

        setIsProfilePhotoLoaded(false);

      const formData = new FormData();
      formData.append('filterEmail', userInfo.loginEmail);
      formData.append('image', e.target.files[0]);

        console.log(e.target.files[0]);

        const headers = {'Content-Type': 'multipart/form-data'};
        axios.post('http://localhost:3001/image-upload', formData, { headers })
        .then(response => {
            console.log(response);

            Swal.fire(
                'Updated!',
                'Your Profile Photo Successfully Updated!',
                'success'
            )

            fetchProfilePhoto();
        })
        .catch(error => {

            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="#">Why do I have this issue?</a>'
              })
        });
    }

    return (
       <div className="profile rounded bg-white mt-3 mb-3">

       <form id="profileForm" onSubmit={profileFormSubmit} method="POST" enctype="multipart/form-data">
           <div className="row">

                <div className="col-md-3 pe-0 border-end">
                    <div className="p-3 py-5">
                        <div className="row">
                            <div className="profile-photo col-md-12 text-center">
                                { 
                                    isProfilePhotoLoaded ?  
                                    profilePhoto ? <img src={profilePhoto} width="100%" className="w-50 mx-auto d-block border border-1 border-success rounded-circle" alt="" /> : <i className="bi bi-person display-1 d-block"></i> 
                                    : <div class="profilephoto-loading-spinner p-5 text-center"><div class="spinner-grow text-success" style={{width:'4rem', height:'4rem'}} role="status"><span class="sr-only"></span></div></div>
                                }
                                <span className="font-weight-bold">{profileForm.name} {profileForm.surname}</span>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="upload-profile-photo col-md-12 text-center">      
                                <label htmlFor="file" className="border border-2 rounded ps-2 pe-2 p-1 btn-success">Change Image</label>
                                <input type="file" id="file" name="file" className="w-100 d-none" value="" onChange={changeProfilePhoto}  accept="image/*" />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="email col-md-12">
                                <span className="text-black-50 text-start">
                                    <label className="labels" htmlFor="email">Email</label>
                                    <input type="text" className="form-control" placeholder="Type your email..." 
                                        name="email"
                                        id="email"
                                        value={profileForm.email} 
                                        onChange={changeProfileForm}
                                        required
                                    />
                                </span>
                                <span> </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-5 border-end">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-right">Profile Settings</h3>
                            <p className="text-black-50">Fill in the data below.</p>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels" htmlFor="name">Name</label>
                                <input type="text" className="form-control" placeholder="Type your name..." 
                                    name="name"
                                    id="name"
                                    value={profileForm.name} 
                                    onChange={changeProfileForm} 
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels" htmlFor="surname">Surname</label>
                                <input type="text" className="form-control" placeholder="Type your surname..." 
                                    name="surname"
                                    id="surname"
                                    value={profileForm.surname} 
                                    onChange={changeProfileForm} 
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 mb-1">
                                <label className="labels" htmlFor="phoneNumber">Mobile Number</label>
                                <PhoneInput
                                    inputProps={{
                                        name: 'phoneNumber',
                                        required: true,
                                        autoFocus: true,
                                        id: 'phoneNumber'
                                    }}
                                    inputClass="form-control w-100"
                                    placeholder="Enter a phone number..."
                                    country={'us'}
                                    preferredCountries={['us']}
                                    enableSearch
                                    value={profileForm.phoneNumber} 
                                    onChange={changePhoneNumber}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels" htmlFor="education">Education</label>
                                <select className="form-select"
                                    name="education"
                                    id="education"
                                    value={profileForm.education} 
                                    onChange={changeProfileForm}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select your education...</option>
                                    <option value="No formal education">No formal education</option>
                                    <option value="Primary education">Primary education</option>
                                    <option value="Secondary education">Secondary education or high school</option>
                                    <option value="GED">GED</option>
                                    <option value="Vocational qualification">Vocational qualification</option>
                                    <option value="Bachelor's degree">Bachelor's degree</option>
                                    <option value="Master's degree">Master's degree</option>
                                    <option value="Doctorate or higher">Doctorate or higher</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label className="labels" htmlFor="country">Country</label>
                                <select className="form-select" 
                                    name="country"
                                    id="country"
                                    value={profileForm.country} 
                                    onChange={changeProfileForm}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select your country...</option>
                                    <option value="Afganistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">American Samoa</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bonaire">Bonaire</option>
                                    <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                    <option value="Brunei">Brunei</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Canary Islands">Canary Islands</option>
                                    <option value="Cape Verde">Cape Verde</option>
                                    <option value="Cayman Islands">Cayman Islands</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Channel Islands">Channel Islands</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island">Christmas Island</option>
                                    <option value="Cocos Island">Cocos Island</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Cook Islands">Cook Islands</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Cote DIvoire">Cote DIvoire</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Curaco">Curacao</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="East Timor">East Timor</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands">Falkland Islands</option>
                                    <option value="Faroe Islands">Faroe Islands</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="French Guiana">French Guiana</option>
                                    <option value="French Polynesia">French Polynesia</option>
                                    <option value="French Southern Ter">French Southern Ter</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Great Britain">Great Britain</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe">Guadeloupe</option>
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Hawaii">Hawaii</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="India">India</option>
                                    <option value="Iran">Iran</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Isle of Man">Isle of Man</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Korea North">Korea North</option>
                                    <option value="Korea Sout">Korea South</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Laos">Laos</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libya">Libya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Macau">Macau</option>
                                    <option value="Macedonia">Macedonia</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">Marshall Islands</option>
                                    <option value="Martinique">Martinique</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Midway Islands">Midway Islands</option>
                                    <option value="Moldova">Moldova</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Nambia">Nambia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherland Antilles">Netherland Antilles</option>
                                    <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                    <option value="Nevis">Nevis</option>
                                    <option value="New Caledonia">New Caledonia</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island">Norfolk Island</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau Island">Palau Island</option>
                                    <option value="Palestine">Palestine</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Phillipines">Philippines</option>
                                    <option value="Pitcairn Island">Pitcairn Island</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico">Puerto Rico</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Republic of Montenegro">Republic of Montenegro</option>
                                    <option value="Republic of Serbia">Republic of Serbia</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia">Russia</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="St Barthelemy">St Barthelemy</option>
                                    <option value="St Eustatius">St Eustatius</option>
                                    <option value="St Helena">St Helena</option>
                                    <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                    <option value="St Lucia">St Lucia</option>
                                    <option value="St Maarten">St Maarten</option>
                                    <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                                    <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                                    <option value="Saipan">Saipan</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="Samoa American">Samoa American</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">Solomon Islands</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syria">Syria</option>
                                    <option value="Tahiti">Tahiti</option>
                                    <option value="Taiwan">Taiwan</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania">Tanzania</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Erimates">United Arab Emirates</option>
                                    <option value="United States of America">United States of America</option>
                                    <option value="Uraguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Vatican City State">Vatican City State</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                    <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                    <option value="Wake Island">Wake Island</option>
                                    <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zaire">Zaire</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="labels" htmlFor="state">State/Region/City</label>
                                <input type="text" className="form-control" placeholder="Type your state, region or city..." 
                                    name="state"      
                                    id="state"            
                                    value={profileForm.state} 
                                    onChange={changeProfileForm}
                                />
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="p-3 py-5">

                    <label className="labels">Hobbies</label>
                    { isHobbiesFetched && <DropdownMultiselect
                        placeholder="Select your hobbies"
                        options={["Reading", "Music", "Traveling", "Fishing", "Crafting", "Collecting", "Gardening", "Video Games"]}
                        name="hobbies"
                        selected={profileForm.hobbies}
                        handleOnChange={changeHobbies}
                        value={profileForm.hobbies} 
                    /> }
                    </div>
                </div>

           </div>
        </form>
       </div> 
    )
}

export default Profile;
