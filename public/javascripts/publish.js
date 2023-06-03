function loggedOut () {
  element = `<form><button class="connectWalletButton" id="connectWalletButton" style="margin-right:40px;">Connect Wallet</button></form>`
  $('#MM').append(element)

  row1 = `
        <div class="col-lg-5 col-md-6 mt-12 mb-5 mb-lg-12" style="border: 1px solid #6168ed;border-radius:10px 10px 10px 10px;height:8rem; display:block;margin-left:auto;margin-right:auto;font-family: OCR A Std, monospace;">
          <div class="icon-box" style="height:100%;">
            <h4 class="title" style="text-align:center;color:#6168ed;">Please connect your Metamask wallet to explore!</h4>
          </div>
        </div>`

  $('#row1').append(row1)
}

function nav (owner_address, chain_id) {
  if (!owner_address) {
    explore = `
        <form action="/explore" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">Explore</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `
    element = ``
  } else {
    explore = `
        <form action="/explore" method="GET" style="padding-right:40px;">
        <button id="connectWalletButton">Explore</button>
        <button class="connectWalletButton" style="display:none;"></button>
        <button class="connectWalletButton" style="display:none;"></button>
        </form>
        `

    trim_owner_address = owner_address.substring(0, 10)
    element = `<p style="color:#13B785;margin-right:80px;font-size:18px;font-family: OCR A Std, monospace;padding-top:1rem;"><i class="ri-check-double-line" style="color:#13B785;padding-right:3px;"></i>${chain_id} | ${trim_owner_address}..</p>`
  }

  $('#explore').append(explore)
  $('#MM').append(element)
}

function body (data, owner_address) {
  section = `
        <section id="contact" class="contact" style="padding-top:30px;">
            <div class="container" data-aos="fade-up">
                <div class="section-title">
                <h2 style="color:#6168ED">Publish</h2>
                <p></p>
                </div>
                <div class="row mt-5">
                <div class="col-lg-4">
                    <label for="standard-select" style="color:#6168ED;font-size:1.5rem;margin-left:25%">Type</label>
                    <div class="select" style="margin-left:25%">
                    <select id="standard-select" onchange="build_options()" single>
                        <option onclick="build_options()" id="Action">Action</option>
                        <option id="BioChemEntity">BiochemEntity</option>
                        <option id="CreativeWork">CreativeWork</option>
                        <option id="Event">Event</option>
                        <option id="Intangible">Intangible</option>
                        <option id="MedicalEntity">Medical Entity</option>
                        <option id="Organization">Organization</option>
                        <option id="Person">Person</option>
                        <option id="Place">Place</option>
                        <option id="Product">Product</option>
                    </select>
                    <span class="single_focus"></span>
                    </div>
                    <!-- type-->
                    <label for="multi-select" style="color:#6168ED;font-size:1.5rem;margin-left:25%">Properties</label>
                    <div class="select select--multiple" style="margin-left:25%">
                    <select id="multi-select" multiple>
                    </select>
                    <span class="multi_focus"></span>
                    </div>
                </div>
                <div class="col-lg-8 mt-5 mt-lg-0">
                    <div id="" action="/publish" style="margin-left:15%;">
                        <input type="text" name="txn_data" id="txn_data" style="display:none;" value="1"></input>
                        <input type="text" name="txn_id" id="txn_id" style="display:none;" value="1"></input>
                        <span style="width:20%;margin-left:1.5%;color:#6168ed;margin-top:-10rem;">Trac Payment:</span>
                        <input name="fee" id="fee" rows="4" placeholder="for node operator" style="font-family: OCR A Std, monospace;float:right;width:20%;margin-right:60%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" value="" ></input>
                        <br>
                        <br>
                        <span style="width:20%;margin-right:30%;color:#6168ed;float:right;margin-top:-3rem;" data-hover="The amount of time you want to pay to keep the asset hosted">Epochs:</span>
                        <input name="epochs" id="epochs" rows="4" placeholder="1 epoch = 90days" style="margin-top:-3rem;font-family: OCR A Std, monospace;width:20%;float:right;margin-right:20%;border: 1px solid #6168ed;border-radius:1px 5px 5px 1px;" value="" required ></input>
                        <input type="text" name="blockchain" id="blockchain" style="display:none;" value="otp::testnet"></input>
                        <div id="form_elements"></div>
                    
                        <input type="text" name="type" class="form-control" id="type" rows="5" style="display: none;" required ></input>
                        <input type="text" name="account" id="account" style="display:none;" value=""></input>
                        <input type="text" name="keywords" class="form-control" id="keywords" rows="5" placeholder="Comma delimited list of keywords..." style="margin-left:17.25%;width:65.5%;margin-bottom:5px;padding:3px 10px;border:1px solid #6168ED" required></input>
                        <div class="php-email-form" style="padding-top:20px;"><button type="submit" id="publish_button" class="publish_button" onclick="sendPublish()" style="background-color:#6168ED;margin-left:42%;">Publish</button></div>
                    </div>
                    <div id="pw_publish" type="text" style="margin-left:25%;display:none;">Please wait... Publishing to the DKG. This may take a few minutes.</div>
                    <div type="text" name="blocked" id="blocked" style="display:none;">You can only submit 1 publish request per 30 seconds.</div>
                    </div>
                </div>
            </div>
                <form id="owner_login_form">
                
                </form>
        </section>
          `

  if (data && data != 'blocked' && data != 'error') {
    if (data.operation.publicGet.status == 'COMPLETED') {
      section = `
                <section id="faq" class="faq section-bg" style="padding-top:130px;">
                    <div class="container" >
                    <div class="section-title">
                        <h2 style="color:#6168ED">Publish ${data.operation.publicGet.status}</h2>
                    </div>
                    <div class="faq-list">
                        <ul>
                        <li data-aos="fade-up" style="padding-left:5px;border: 1px solid #6168ED;">
                            <a data-bs-toggle="collapse" class="collapse" data-bs-target="#faq-list-1" style ="word-wrap: break-word;color:#6168ED;">
                                ${data.operation.publicGet.status} | Operation ID: ${data.operation.publicGet.operationId}
                            <i class="bx bx-chevron-down icon-show" style="color:#13B785" ></i><i class="bx bx-chevron-up icon-close" style="color:#13B785"></i></a>
                            <div id="faq-list-1" class="collapse" data-bs-parent=".faq-list">
                            <section id="contact" class="contact" style="padding:0px 0px;">
                                <div class="container" >
                                <div class="section-title">
                                    <form  class="get" id="get_form" action="/lookup" method="GET">
                                    <input type="text" name="ual" id="ual" style="display:none;" value="${data.UAL}"></input>
                                    <input type="text" name="owner_address" id="owner_address" style="display:none;" value="${owner_address}"></input>
                                    <div class="php-email-form"><button type="submit" style="float: right;padding:3px 10px;background-color:#6168ED;" onclick="getwait()" class ="get_button" id="get_button">Get Data</button></div>
                                    </form>
                                </div>
                                </div>
                            </section>
                            <ul>
                                <li style="padding-top:5px;padding-bottom:0px;word-wrap: break-word;">
                                <ul style="border-left: 5px solid #6168ED;background-color: #f1f1f1;list-style-type: none;padding: 10px 20px;">
                                    <li style="padding-top:0px;padding-left:5px;padding-bottom:0px;background:none;word-wrap: break-word;">UAL: ${data.UAL}</li>
                                    <li style="padding-top:0px;padding-left:5px;padding-bottom:0px;background:none;word-wrap: break-word;">Assertion: ${data.public.assertionId}</li>
                                </ul>
                                </li>
                            </ul>
                            </div>
                        </li>
                        </ul>
                    </div>
                    <section id="contact" class="contact" style="padding:10px 0px;">
                        <div class="container" >
                        <div class="section-title">
                            <div class="php-email-form"><button type="submit" style="background-color:#6168ED"><a href="/publish" style="color:white;background-color:none;">Publish Again</a></button></div>
                        </div>
                        </div>
                    </section>
                    </div>
                </section>
                `
    }

    if (data.operation.publicGet.status != 'COMPLETED') {
      section = `
                <section id="faq" class="faq section-bg" style="padding-top:130px;">
                    <div class="container" >
                    <div class="section-title">
                        <h2 style="color:#880808">Publish ${data.operation.publicGet.status}</h2>
                    </div>
                    <div class="php-email-form"><button type="submit"><a href="/publish" style="color:white;">Try Again</a></button></div>
                    </div>
                </section>
                `
    }
  }

  $('#main').append(section)
}

function add (property) {
  if (parseInt($('#total' + property + '_check').val()) != 3) {
    var new_check_num = parseInt($('#total' + property + '_check').val()) + 1
    var new_field_input =
      "<input type='text' class='form-control' style='padding:3px 10px;border:1px solid #6168ED;margin-bottom:1px;' name='" +
      property +
      'Field' +
      new_check_num +
      "' id='" +
      property +
      'Field' +
      new_check_num +
      "' placeholder='field...' >"
    var new_value_input =
      "<input type='text' class='form-control' style='padding:3px 10px;border:1px solid #6168ED;margin-bottom:1px;' name='" +
      property +
      'Value' +
      new_check_num +
      "' id='" +
      property +
      'Value' +
      new_check_num +
      "' placeholder='value...' >"
    $('#' + property + 'Field_check').append(new_field_input)
    $('#' + property + 'Value_check').append(new_value_input)
    $('#total' + property + '_check').val(new_check_num)
  }
}

function remove (property) {
  var last_check_num = $('#total' + property + '_check').val()
  if (last_check_num > 1) {
    $('#' + property + 'Field' + last_check_num).remove()
    $('#' + property + 'Value' + last_check_num).remove()
    $('#total' + property + '_check').val(last_check_num - 1)
  }
}

function buildform (property) {
  if (document.getElementById(`${property}_row`)) {
    document.getElementById(`${property}_row`).remove()
    document.getElementById(`${property}`).style.color = '#6168ED'
  } else {
    document.getElementById(`${property}`).style.color = '#13B785'
    var new_row = `<div class="row" id="${property}_row" style="padding-bottom:10px;">
        <p style="margin-bottom:-1px;color:#6168ED">${property}</p>
        <div class="col-md-1 form-group">
          <div class="php-email-form">
            <button type="button" id="add_button" class="add_button" onclick="add('${property}')" style="padding:3px 10px;background-color:#6168ED;">+</button>
          </div>
        </div>
        <div class="col-md-1 form-group">
          <div class="php-email-form">
            <button type="button" id="sub_button" class="sub_button" onclick="remove('${property}')" style="padding:3px 12px;background-color:#6168ED;">-</button>
          </div>
        </div>
        <div class="col-md-4 form-group">
          <input type="text" class="form-control" name="${property}Field1" id="${property}Field1" placeholder="field..." style="padding:3px 10px;border:1px solid #6168ED;margin-bottom:1px;" pattern=".{1,}">
          <div id="${property}Field_check"></div>
          <input type="hidden" value="1" id="total${property}_check">
        </div>
        <div class="col-md-4 form-group">
          <input type="text" class="form-control" name="${property}Value1" id="${property}Value1" placeholder="value..." style="padding:3px 10px;border:1px solid #6168ED;margin-bottom:1px;" pattern=".{1,}">
          <div id="${property}Value_check"></div>
          <input type="hidden" value="1" id="total${property}_check">
        </div>
        <div style="height:1px;width:85%;background-color:#D1D1D1;margin-top:7px;"></div>
      </div>`

    $('#form_elements').append(new_row)
  }
}

// END SHOW FORM ELEMENTS
function build_options () {
  $('.multi_list_option').remove()
  document.getElementById('form_elements').innerHTML = ''
  action_list = [
    'actionStatus',
    'agent',
    'endTime',
    'error',
    'instrument',
    'location',
    'object',
    'participant',
    'provider',
    'result',
    'target',
    'additionalType',
    'alternateName',
    'description',
    'disambiguatingDescription',
    'identifier',
    'image',
    'mainEntityOfPage',
    'name',
    'potentialAction',
    'sameAs',
    'subjectOf',
    'url'
  ]

  biochem_list = [
    'associatedDisease',
    'bioChemInteraction',
    'bioChemSimilarity',
    'biologicalRole',
    'hasBioChemEntityPart',
    'hasMolecularFunction',
    'hasRepresentation',
    'isEncodedByBioChemEntity',
    'isInvolvedInBiologicalProcess',
    'isLocatedInSubcellularLocation',
    'isPartOfBioChemEntity',
    'taxonomicRange',
    'additionalType',
    'alternateName',
    'description',
    'disambiguatingDescription',
    'identifier',
    'image',
    'mainEntityOfPage',
    'name',
    'potentialAction',
    'sameAs',
    'subjectOf',
    'url'
  ]

  creativework_list = [
    'about',
    'abstract',
    'accessMode',
    'accessModeSufficient',
    'accessibilityAPI',
    'accessibilityControl',
    'accessibilityFeature',
    'accessibilityHazard',
    'accessibilitySummary',
    'accountablePerson',
    'acquireLicensePage',
    'actionableFeedbackPolicy',
    'aggregateRating',
    'alternativeHeadline',
    'archivedAt',
    'appearance',
    'audience',
    'audio',
    'author',
    'award',
    'backstory',
    'character',
    'cheatCode',
    'citation',
    'comment',
    'commentCount',
    'conditionsOfAccess',
    'contentLocation',
    'contentRating',
    'contentReferenceTime',
    'contributor',
    'copyrightHolder',
    'copyrightNotice',
    'copyrightYear',
    'correction',
    'correctionsPolicy',
    'countryOfOrigin',
    'creativeWorkStatus',
    'creator',
    'creditText',
    'dateCreated',
    'dateModified',
    'datePublished',
    'discusses',
    'diversityPolicy',
    'documentation',
    'editEIDR',
    'editor',
    'educationalAlignment',
    'educationalLevel',
    'educationalUse',
    'encodesCreativeWork',
    'encoding',
    'encodingFormat',
    'ethicsPolicy',
    'exampleOfWork',
    'expires',
    'firstAppearance',
    'fundedItem',
    'funder',
    'funding',
    'gameTip',
    'genre',
    'hasPart',
    'headline',
    'inLanguage',
    'interactivityType',
    'isBasedOn',
    'isPartOf',
    'license',
    'locationCreated',
    'lyrics',
    'mainEntity',
    'maintainer',
    'masthead',
    'material',
    'materialExtent',
    'mentions',
    'messageAttachment',
    'missionCoveragePrioritiesPolicy',
    'noBylinesPolicy',
    'offers',
    'ownershipFundingInfo',
    'pattern',
    'position',
    'producer',
    'provider',
    'publication',
    'publisher',
    'publisherImprint',
    'publishingPrinciples',
    'recipeInstructions',
    'recordedAt',
    'recordedIn',
    'releasedEvent',
    'review',
    'schemaVersion',
    'sdDatePublished',
    'sdLicense',
    'sdPublisher',
    'sharedContent',
    'size',
    'softwareHelp',
    'sourceOrganization',
    'spatial',
    'spatialCoverage',
    'sponsor',
    'step',
    'steps',
    'teaches',
    'temporal',
    'temporalCoverage',
    'text',
    'thumbnailUrl',
    'timeRequired',
    'translationOfWork',
    'translator',
    'typicalAgeRange',
    'unnamedSourcesPolicy',
    'usageInfo',
    'verificationFactCheckingPolicy',
    'version',
    'video',
    'workExample',
    'workFeatured',
    'workPerformed',
    'workTranslation',
    'additionalType',
    'alternateName',
    'description',
    'disambiguatingDescription',
    'identifier',
    'image',
    'mainEntityOfPage',
    'name',
    'potentialAction',
    'sameAs',
    'subjectOf',
    'url'
  ]

  event_list = [
    'about',
    'actor',
    'aggregateRating',
    'attendee',
    'audience',
    'composer',
    'contributor',
    'director',
    'doorTime',
    'duration',
    'endDate',
    'eventAttendanceMode',
    'eventSchedule',
    'eventStatus',
    'funder',
    'funding',
    'inLanguage',
    'location',
    'maximumAttendeeCapacity',
    'maximumPhysicalAttendeeCapacity',
    'maximumVirtualAttendeeCapacity',
    'offers',
    'organizer',
    'performer',
    'previousStartDate',
    'recordedIn',
    'remainingAttendeeCapacity',
    'review',
    'sponsor',
    'startDate',
    'subEvent',
    'superEvent',
    'translator',
    'typicalAgeRange',
    'workFeatured',
    'workPerformed',
    'additionalType',
    'alternateName',
    'description',
    'disambiguatingDescription',
    'identifier',
    'image',
    'mainEntityOfPage',
    'name',
    'potentialAction',
    'sameAs',
    'subjectOf',
    'url'
  ]

  intangible_list = [
    'additionalType',
    'alternateName',
    'description',
    'disambiguatingDescription',
    'identifier',
    'image',
    'mainEntityOfPage',
    'name',
    'potentialAction',
    'sameAs',
    'subjectOf',
    'url'
  ]

  medentity_list = [
    'code',
    'guideline',
    'legalStatus',
    'medicineSystem',
    'recognizingAuthority',
    'relevantSpecialty',
    'study',
    'additionalType',
    'alternateName',
    'description',
    'disambiguatingDescription',
    'identifier',
    'image',
    'mainEntityOfPage',
    'name',
    'potentialAction',
    'sameAs',
    'subjectOf',
    'url'
  ]

  org_list = [
    'actionableFeedbackPolicy',
    'address',
    'aggregateRating',
    'alumni',
    'areaServed',
    'award',
    'brand',
    'contactPoint',
    'correctionsPolicy',
    'department',
    'dissolutionDate',
    'diversityPolicy',
    'diversityStaffingReport',
    'duns',
    'email',
    'employee',
    'ethicsPolicy',
    'event',
    'faxNumber',
    'founder',
    'foundingDate',
    'foundingLocation',
    'funder',
    'funding',
    'globalLocationNumber',
    'hasCredential',
    'hasMerchantReturnPolicy',
    'hasOfferCatalog',
    'hasPOS',
    'interactionStatistic',
    'isicV4',
    'iso6523Code',
    'knowsAbout',
    'knowsLanguage',
    'legalName',
    'leiCode',
    'location',
    'logo',
    'makesOffer',
    'member',
    'memberOf',
    'naics',
    'nonprofitStatus',
    'numberOfEmployees',
    'ownershipFundingInfo',
    'owns',
    'parentOrganization',
    'publishingPrinciples',
    'review',
    'seeks',
    'slogan',
    'sponsor',
    'subOrganization',
    'taxID',
    'telephone',
    'unnamedSourcesPolicy',
    'vatID',
    'additionalType',
    'alternateName',
    'description',
    'disambiguatingDescription',
    'identifier',
    'image',
    'mainEntityOfPage',
    'name',
    'potentialAction',
    'sameAs',
    'subjectOf',
    'url'
  ]

  person_list = [
    'additionalName',
    'address',
    'affiliation',
    'alumniOf',
    'award',
    'birthDate',
    'birthPlace',
    'brand',
    'callSign',
    'children',
    'colleague',
    'contactPoint',
    'deathDate',
    'deathPlace',
    'duns',
    'email',
    'familyName',
    'faxNumber',
    'follows',
    'funder',
    'funding',
    'gender',
    'givenName',
    'globalLocationNumber',
    'hasCredential',
    'hasOccupation',
    'hasOfferCatalog',
    'hasPOS',
    'height',
    'homeLocation',
    'honorificPrefix',
    'honorificSuffix',
    'interactionStatistic',
    'isicV4',
    'jobTitle',
    'knows',
    'knowsAbout',
    'knowsLanguage',
    'makesOffer',
    'memberOf',
    'naics',
    'nationality',
    'netWorth',
    'owns',
    'parent',
    'performerIn',
    'publishingPrinciples',
    'relatedTo',
    'seeks',
    'sibling',
    'sponsor',
    'spouse',
    'taxID',
    'telephone',
    'vatID',
    'weight',
    'workLocation',
    'worksFor',
    'additionalType',
    'alternateName',
    'description',
    'disambiguatingDescription',
    'identifier',
    'image',
    'mainEntityOfPage',
    'name',
    'potentialAction',
    'sameAs',
    'subjectOf',
    'url'
  ]

  place_list = [
    'additionalProperty',
    'address',
    'aggregateRating',
    'amenityFeature',
    'branchCode',
    'containedInPlace',
    'containsPlace',
    'event',
    'faxNumber',
    'geo',
    'geoContains',
    'geoCovers',
    'geoCrosses',
    'geoDisjoint',
    'geoEquals',
    'geoIntersects',
    'geoOverlaps',
    'geoTouches',
    'geoWithin',
    'globalLocationNumber',
    'hasDriveThroughService',
    'hasMap',
    'isicV4',
    'latitude',
    'logo',
    'longitude',
    'maximumAttendeeCapacity',
    'openingHoursSpecification',
    'photo',
    'publicAccess',
    'review',
    'slogan',
    'smokingAllowed',
    'specialOpeningHoursSpecification',
    'telephone',
    'tourBookingPage',
    'additionalType',
    'alternateName',
    'description',
    'disambiguatingDescription',
    'identifier',
    'image',
    'mainEntityOfPage',
    'name',
    'potentialAction',
    'sameAs',
    'subjectOf',
    'url'
  ]

  product_list = [
    'additionalProperty',
    'aggregateRating',
    'audience',
    'award',
    'brand',
    'category',
    'color',
    'countryOfAssembly',
    'countryOfLastProcessing',
    'countryOfOrigin',
    'depth',
    'gtin',
    'gtin12',
    'gtin13',
    'gtin14',
    'gtin8',
    'hasAdultConsideration',
    'hasEnergyConsumptionDetails',
    'hasMeasurement',
    'hasMerchantReturnPolicy',
    'height',
    'inProductGroupWithID',
    'isAccessoryOrSparePartFor',
    'isConsumableFor',
    'isFamilyFriendly',
    'isRelatedTo',
    'isSimilarTo',
    'isVariantOf',
    'itemCondition',
    'logo',
    'manufacturer',
    'material',
    'model',
    'mpn',
    'nsn',
    'offers',
    'pattern',
    'productID',
    'productionDate',
    'purchaseDate',
    'releaseDate',
    'review',
    'size',
    'sku',
    'slogan',
    'weight',
    'width',
    'additionalType',
    'alternateName',
    'description',
    'disambiguatingDescription',
    'identifier',
    'image',
    'mainEntityOfPage',
    'name',
    'potentialAction',
    'sameAs',
    'subjectOf',
    'url'
  ]

  if (document.getElementById('Action').selected == true) {
    document.getElementById('type').value = 'Action'
    list = action_list
  }

  if (document.getElementById('BioChemEntity').selected == true) {
    document.getElementById('type').value = 'BioChemEntity'
    list = biochem_list
  }

  if (document.getElementById('CreativeWork').selected == true) {
    document.getElementById('type').value = 'CreativeWork'
    list = creativework_list
  }

  if (document.getElementById('Event').selected == true) {
    document.getElementById('type').value = 'Event'
    list = event_list
  }

  if (document.getElementById('Intangible').selected == true) {
    document.getElementById('type').value = 'Intangible'
    list = intangible_list
  }

  if (document.getElementById('MedicalEntity').selected == true) {
    document.getElementById('type').value = 'MedicalEntity'
    list = medentity_list
  }

  if (document.getElementById('Organization').selected == true) {
    document.getElementById('type').value = 'Organization'
    list = org_list
  }

  if (document.getElementById('Person').selected == true) {
    document.getElementById('type').value = 'Person'
    list = person_list
  }

  if (document.getElementById('Place').selected == true) {
    document.getElementById('type').value = 'Place'
    list = place_list
  }

  if (document.getElementById('Product').selected == true) {
    document.getElementById('type').value = 'Product'
    list = product_list
  }

  for (i = 0; i < list.length; i++) {
    option = list[i]
    console.log(option)
    new_option_element = `<option id="${option}" onclick="buildform('${option}')" class="multi_list_option">${option}</option>`
    console.log(new_option_element)
    $('#multi-select').append(new_option_element)
  }
}
