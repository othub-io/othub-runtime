function work(body){
  data = {
    "@context": "https://schema.org/",
    "@type": ""
    }

  if (body.actionStatusField1) {
    data["actionStatus"] = {};
    data["actionStatus"]["@type"] = "ActionStatusType";
    data["actionStatus"][body.actionStatusField1] = body.actionStatusValue1;
  }
  if (body.actionStatusField2) {
    data["actionStatus"][body.actionStatusField2] = body.actionStatusValue2;
  }
  if (body.actionStatusField3) {
    data["actionStatus"][body.actionStatusField3] = body.actionStatusValue3;
  }

  if (body.agentField1) {
    data["agent"] = {};
    data["agent"]["@type"] = "Person";
    data["agent"][body.agentField1] = body.agentValue1;
  }
  if (body.agentField2) {
    data["agent"][body.agentField2] = body.agentValue2;
  }
  if (body.agentField3) {
    data["agent"][body.agentField3] = body.agentValue3;
  }

  if (body.endTimeField1) {
    data["endTime"] = {};
    data["endTime"]["@type"] = "DateTime";
    data["endTime"][body.endTimeField1] = body.endTimeValue1;
  }
  if (body.endTimeField2) {
    data["endTime"][body.endTimeField2] = body.endTimeValue2;
  }
  if (body.endTimeField3) {
    data["endTime"][body.endTimeField3] = body.endTimeValue3;
  }

  if (body.errorField1) {
    data["error"] = {};
    data["error"]["@type"] = "Thing";
    data["error"][body.errorField1] = body.errorValue1;
  }
  if (body.endTimeField2) {
    data["error"][body.errorField2] = body.errorValue2;
  }
  if (body.endTimeField3) {
    data["error"][body.errorField3] = body.errorValue3;
  }

  if (body.instrumentField1) {
    data["instrument"] = {};
    data["instrument"]["@type"] = "Thing";
    data["instrument"][body.instrumentField1] = body.instrumentValue1;
  }
  if (body.instrumentField2) {
    data["instrument"][body.instrumentField2] = body.instrumentValue2;
  }
  if (body.instrumentField3) {
    data["instrument"][body.instrumentField3] = body.instrumentValue3;
  }

  if (body.locationField1) {
    data["location"] = {};
    data["location"]["@type"] = "Place";
    data["location"][body.locationField1] = body.locationValue1;
  }
  if (body.locationField2) {
    data["location"][body.locationField2] = body.locationValue2;
  }
  if (body.locationField3) {
    data["location"][body.locationField3] = body.locationValue3;
  }

  if (body.objectField1) {
    data["object"] = {};
    data["object"]["@type"] = "Thing";
    data["object"][body.objectField1] = body.objectValue1;
  }
  if (body.instrumentField2) {
    data["object"][body.objectField2] = body.objectValue2;
  }
  if (body.instrumentField3) {
    data["object"][body.objectField3] = body.objectValue3;
  }

  if (body.participantField1) {
    data["participant"] = {};
    data["participant"]["@type"] = "Person";
    data["participant"][body.participantField1] = body.participantValue1;
  }
  if (body.participantField2) {
    data["participant"][body.participantField2] = body.participantValue2;
  }
  if (body.participantField3) {
    data["participant"][body.participantField3] = body.participantValue3;
  }

  if (body.providerField1) {
    data["provider"] = {};
    data["provider"]["@type"] = "Person";
    data["provider"][body.providerField1] = body.providerValue1;
  }
  if (body.providerField2) {
    data["provider"][body.providerField2] = body.providerValue2;
  }
  if (body.providerField3) {
    data["provider"][body.providerField3] = body.providerValue3;
  }

  if (body.resultField1) {
    data["result"] = {};
    data["result"]["@type"] = "Thing";
    data["result"][body.resultField1] = body.resultValue1;
  }
  if (body.resultField2) {
    data["result"][body.resultField2] = body.resultValue2;
  }
  if (body.resultField3) {
    data["result"][body.resultField3] = body.resultValue3;
  }

  if (body.startTimeField1) {
    data["startTime"] = {};
    data["startTime"]["@type"] = "DateTime";
    data["startTime"][body.startTimeField1] = body.startTimeValue1;
  }
  if (body.startTimeField2) {
    data["startTime"][body.startTimeField2] = body.startTimeValue2;
  }
  if (body.startTimeField3) {
    data["startTime"][body.startTimeField3] = body.startTimeValue3;
  }

  if (body.targetField1) {
    data["target"] = {};
    data["target"]["@type"] = "EntryPoint";
    data["target"][body.targetField1] = body.targetValue1;
  }
  if (body.targetField2) {
    data["target"][body.targetField2] = body.targetValue2;
  }
  if (body.targetField3) {
    data["target"][body.targetField3] = body.targetValue3;
  }

  if (body.associatedDiseaseField1) {
    data["associatedDisease"] = {};
    data["associatedDisease"]["@type"] = "MedicalCondition";
    data["associatedDisease"][body.associatedDiseaseField1] =
      body.associatedDiseaseValue1;
  }
  if (body.associatedDiseaseField2) {
    data["associatedDisease"][body.associatedDiseaseField2] =
      body.associatedDiseaseValue2;
  }
  if (body.associatedDiseaseField3) {
    data["associatedDisease"][body.associatedDiseaseField3] =
      body.associatedDiseaseValue3;
  }

  if (body.bioChemInteractionField1) {
    data["bioChemInteraction"] = {};
    data["bioChemInteraction"]["@type"] = "BioChemEntity";
    data["bioChemInteraction"][body.bioChemInteractionField1] =
      body.bioChemInteractionValue1;
  }
  if (body.bioChemInteractionField2) {
    data["bioChemInteraction"][body.bioChemInteractionField2] =
      body.bioChemInteractionValue2;
  }
  if (body.bioChemInteractionField3) {
    data["bioChemInteraction"][body.bioChemInteractionField3] =
      body.bioChemInteractionValue3;
  }

  if (body.bioChemSimilarityField1) {
    data["bioChemSimilarity"] = {};
    data["bioChemSimilarity"]["@type"] = "BioChemEntity";
    data["bioChemSimilarity"][body.bioChemSimilarityField1] =
      body.bioChemSimilarityValue1;
  }
  if (body.bioChemInteractionField2) {
    data["bioChemSimilarity"][body.bioChemSimilarityField2] =
      body.bioChemSimilarityValue2;
  }
  if (body.bioChemInteractionField3) {
    data["bioChemSimilarity"][body.bioChemSimilarityField3] =
      body.bioChemSimilarityValue3;
  }

  if (body.biologicalRoleField1) {
    data["biologicalRole"] = {};
    data["biologicalRole"]["@type"] = "DefinedTerm";
    data["biologicalRole"][body.biologicalRoleField1] =
      body.biologicalRoleValue1;
  }
  if (body.biologicalRoleField2) {
    data["biologicalRole"][body.biologicalRoleField2] =
      body.biologicalRoleValue2;
  }
  if (body.biologicalRoleField3) {
    data["biologicalRole"][body.biologicalRoleField3] =
      body.biologicalRoleValue3;
  }

  if (body.hasBioChemEntityPartField1) {
    data["hasBioChemEntityPart"] = {};
    data["hasBioChemEntityPart"]["@type"] = "BioChemEntity";
    data["hasBioChemEntityPart"][body.hasBioChemEntityPartField1] =
      body.hasBioChemEntityPartValue1;
  }
  if (body.hasBioChemEntityPartField2) {
    data["hasBioChemEntityPart"][body.hasBioChemEntityPartField2] =
      body.hasBioChemEntityPartValue2;
  }
  if (body.hasBioChemEntityPartField3) {
    data["hasBioChemEntityPart"][body.hasBioChemEntityPartField3] =
      body.hasBioChemEntityPartValue3;
  }

  if (body.hasMolecularFunctionField1) {
    data["hasMolecularFunction"] = {};
    data["hasMolecularFunction"]["@type"] = "DefinedTerm";
    data["hasMolecularFunction"][body.hasMolecularFunctionField1] =
      body.hasMolecularFunctionValue1;
  }
  if (body.hasMolecularFunctionField2) {
    data["hasMolecularFunction"][body.hasMolecularFunctionField2] =
      body.hasMolecularFunctionValue2;
  }
  if (body.hasMolecularFunctionField3) {
    data["hasMolecularFunction"][body.hasMolecularFunctionField3] =
      body.hasMolecularFunctionValue3;
  }

  if (body.hasRepresentationField1) {
    data["hasRepresentation"] = {};
    data["hasRepresentation"]["@type"] = "Text";
    data["hasRepresentation"][body.hasRepresentationField1] =
      body.hasRepresentationValue1;
  }
  if (body.hasRepresentationField2) {
    data["hasRepresentation"][body.hasRepresentationField2] =
      body.hasRepresentationValue2;
  }
  if (body.hasRepresentationField3) {
    data["hasRepresentation"][body.hasRepresentationField3] =
      body.hasRepresentationValue3;
  }

  if (body.isEncodedByBioChemEntityField1) {
    data["isEncodedByBioChemEntity"] = {};
    data["isEncodedByBioChemEntity"]["@type"] = "Gene";
    data["isEncodedByBioChemEntity"][body.isEncodedByBioChemEntityField1] =
      body.isEncodedByBioChemEntityValue1;
  }
  if (body.isEncodedByBioChemEntityField2) {
    data["isEncodedByBioChemEntity"][body.isEncodedByBioChemEntityField2] =
      body.isEncodedByBioChemEntityValue2;
  }
  if (body.isEncodedByBioChemEntityField3) {
    data["isEncodedByBioChemEntity"][body.isEncodedByBioChemEntityField3] =
      body.isEncodedByBioChemEntityValue3;
  }

  if (body.isInvolvedInBiologicalProcessField1) {
    data["isInvolvedInBiologicalProcess"] = {};
    data["isInvolvedInBiologicalProcess"]["@type"] = "DefinedTerm";
    data["isInvolvedInBiologicalProcess"][
      body.isInvolvedInBiologicalProcessField1
    ] = body.isInvolvedInBiologicalProcessValue1;
  }
  if (body.isInvolvedInBiologicalProcessField2) {
    data["isInvolvedInBiologicalProcess"][
      body.isInvolvedInBiologicalProcessField2
    ] = body.isInvolvedInBiologicalProcessValue2;
  }
  if (body.isInvolvedInBiologicalProcessField3) {
    data["isInvolvedInBiologicalProcess"][
      body.isInvolvedInBiologicalProcessField3
    ] = body.isInvolvedInBiologicalProcessValue3;
  }

  if (body.isLocatedInSubcellularLocationField1) {
    data["isLocatedInSubcellularLocation"] = {};
    data["isLocatedInSubcellularLocation"]["@type"] = "DefinedTerm";
    data["isLocatedInSubcellularLocation"][
      body.isLocatedInSubcellularLocationField1
    ] = body.isLocatedInSubcellularLocationValue1;
  }
  if (body.isLocatedInSubcellularLocationField2) {
    data["isLocatedInSubcellularLocation"][
      body.isLocatedInSubcellularLocationField2
    ] = body.isLocatedInSubcellularLocationValue2;
  }
  if (body.isLocatedInSubcellularLocationField3) {
    data["isLocatedInSubcellularLocation"][
      body.isLocatedInSubcellularLocationField3
    ] = body.isLocatedInSubcellularLocationValue3;
  }

  if (body.isPartOfBioChemEntityField1) {
    data["isPartOfBioChemEntity"] = {};
    data["isPartOfBioChemEntity"]["@type"] = "BioChemEntity";
    data["isPartOfBioChemEntity"][body.isPartOfBioChemEntityField1] =
      body.isPartOfBioChemEntityValue1;
  }
  if (body.isPartOfBioChemEntityField2) {
    data["isPartOfBioChemEntity"][body.isPartOfBioChemEntityField2] =
      body.isPartOfBioChemEntityValue2;
  }
  if (body.isPartOfBioChemEntityField3) {
    data["isPartOfBioChemEntity"][body.isPartOfBioChemEntityField3] =
      body.isPartOfBioChemEntityValue3;
  }

  if (body.taxonomicRangeField1) {
    data["taxonomicRange"] = {};
    data["taxonomicRange"]["@type"] = "DefinedTerm";
    data["taxonomicRange"][body.taxonomicRangeField1] =
      body.taxonomicRangeValue1;
  }
  if (body.taxonomicRangeField2) {
    data["taxonomicRange"][body.taxonomicRangeField2] =
      body.taxonomicRangeValue2;
  }
  if (body.taxonomicRangeField3) {
    data["taxonomicRange"][body.taxonomicRangeField3] =
      body.taxonomicRangeValue3;
  }

  if (body.aboutField1) {
    data["about"] = {};
    data["about"]["@type"] = "Thing";
    data["about"][body.aboutField1] = body.aboutValue1;
  }
  if (body.aboutField2) {
    data["about"][body.aboutField2] = body.aboutValue2;
  }
  if (body.aboutField3) {
    data["about"][body.aboutField3] = body.aboutValue3;
  }

  if (body.abstractField1) {
    data["abstract"] = {};
    data["abstract"]["@type"] = "Text";
    data["abstract"][body.abstractField1] = body.abstractValue1;
  }
  if (body.abstractField2) {
    data["abstract"][body.abstractField2] = body.abstractValue2;
  }
  if (body.abstractField3) {
    data["abstract"][body.abstractField3] = body.abstractValue3;
  }

  if (body.accessModeField1) {
    data["accessMode"] = {};
    data["accessMode"]["@type"] = "Text";
    data["accessMode"][body.accessModeField1] = body.accessModeValue1;
  }
  if (body.accessModeField2) {
    data["accessMode"][body.accessModeField2] = body.accessModeValue2;
  }
  if (body.accessModeField3) {
    data["accessMode"][body.accessModeField3] = body.accessModeValue3;
  }

  if (body.accessModeSufficientField1) {
    data["accessModeSufficient"] = {};
    data["accessModeSufficient"]["@type"] = "ItemList";
    data["accessModeSufficient"][body.accessModeSufficientField1] =
      body.accessModeSufficientValue1;
  }
  if (body.accessModeSufficientField2) {
    data["accessModeSufficient"][body.accessModeSufficientField2] =
      body.accessModeSufficientValue2;
  }
  if (body.accessModeSufficientField3) {
    data["accessModeSufficient"][body.accessModeSufficientField3] =
      body.accessModeSufficientValue3;
  }

  if (body.accessibilityAPIField1) {
    data["accessibilityAPI"] = {};
    data["accessibilityAPI"]["@type"] = "Text";
    data["accessibilityAPI"][body.accessibilityAPIField1] =
      body.accessibilityAPIValue1;
  }
  if (body.accessibilityAPIField2) {
    data["accessibilityAPI"][body.accessibilityAPIField2] =
      body.accessibilityAPIValue2;
  }
  if (body.accessibilityAPIField3) {
    data["accessibilityAPI"][body.accessibilityAPIField3] =
      body.accessibilityAPIValue3;
  }

  if (body.accessibilityControlField1) {
    data["accessibilityControl"] = {};
    data["accessibilityControl"]["@type"] = "Text";
    data["accessibilityControl"][body.accessibilityControlField1] =
      body.accessibilityControlValue1;
  }
  if (body.accessibilityControlField2) {
    data["accessibilityControl"][body.accessibilityControlField2] =
      body.accessibilityControlValue2;
  }
  if (body.accessibilityControlField3) {
    data["accessibilityControl"][body.accessibilityControlField3] =
      body.accessibilityControlValue3;
  }

  if (body.accessibilityFeatureField1) {
    data["accessibilityFeature"] = {};
    data["accessibilityFeature"]["@type"] = "Text";
    data["accessibilityFeature"][body.accessibilityFeatureField1] =
      body.accessibilityFeatureValue1;
  }
  if (body.accessibilityFeatureField2) {
    data["accessibilityFeature"][body.accessibilityFeatureField2] =
      body.accessibilityFeatureValue2;
  }
  if (body.accessibilityFeatureField3) {
    data["accessibilityFeature"][body.accessibilityFeatureField3] =
      body.accessibilityFeatureValue3;
  }

  if (body.accessibilityHazardField1) {
    data["accessibilityHazard"] = {};
    data["accessibilityHazard"]["@type"] = "Text";
    data["accessibilityHazard"][body.accessibilityHazardField1] =
      body.accessibilityHazardValue1;
  }
  if (body.accessibilityHazardField2) {
    data["accessibilityHazard"][body.accessibilityHazardField2] =
      body.accessibilityHazardValue2;
  }
  if (body.accessibilityHazardField3) {
    data["accessibilityHazard"][body.accessibilityHazardField3] =
      body.accessibilityHazardValue3;
  }

  if (body.accessibilitySummaryField1) {
    data["accessibilitySummary"] = {};
    data["accessibilitySummary"]["@type"] = "Text";
    data["accessibilitySummary"][body.accessibilitySummaryField1] =
      body.accessibilitySummaryValue1;
  }
  if (body.accessibilitySummaryField2) {
    data["accessibilitySummary"][body.accessibilitySummaryField2] =
      body.accessibilitySummaryValue2;
  }
  if (body.accessibilitySummaryField3) {
    data["accessibilitySummary"][body.accessibilitySummaryField3] =
      body.accessibilitySummaryValue3;
  }

  if (body.accountablePersonField1) {
    data["accountablePerson"] = {};
    data["accountablePerson"]["@type"] = "Person";
    data["accountablePerson"][body.accountablePersonField1] =
      body.accountablePersonValue1;
  }
  if (body.accountablePersonField2) {
    data["accountablePerson"][body.accountablePersonField2] =
      body.accountablePersonValue2;
  }
  if (body.accountablePersonField3) {
    data["accountablePerson"][body.accountablePersonField3] =
      body.accountablePersonValue3;
  }

  if (body.acquireLicensePageField1) {
    data["acquireLicensePage"] = {};
    data["acquireLicensePage"]["@type"] = "CreativeWork";
    data["acquireLicensePage"][body.acquireLicensePageField1] =
      body.acquireLicensePageValue1;
  }
  if (body.acquireLicensePageField2) {
    data["acquireLicensePage"][body.acquireLicensePageField2] =
      body.acquireLicensePageValue2;
  }
  if (body.acquireLicensePageField3) {
    data["acquireLicensePage"][body.acquireLicensePageField3] =
      body.acquireLicensePageValue3;
  }

  if (body.aggregateRatingField1) {
    data["aggregateRating"] = {};
    data["aggregateRating"]["@type"] = "AggregateRating";
    data["aggregateRating"][body.aggregateRatingField1] =
      body.aggregateRatingValue1;
  }
  if (body.aggregateRatingField2) {
    data["aggregateRating"][body.aggregateRatingField2] =
      body.aggregateRatingValue2;
  }
  if (body.aggregateRatingField3) {
    data["aggregateRating"][body.aggregateRatingField3] =
      body.aggregateRatingValue3;
  }

  if (body.alternativeHeadlineField1) {
    data["alternativeHeadline"] = {};
    data["alternativeHeadline"]["@type"] = "Text";
    data["alternativeHeadline"][body.alternativeHeadlineField1] =
      body.alternativeHeadlineValue1;
  }
  if (body.alternativeHeadlineField2) {
    data["alternativeHeadline"][body.alternativeHeadlineField2] =
      body.alternativeHeadlineValue2;
  }
  if (body.alternativeHeadlineField3) {
    data["alternativeHeadline"][body.alternativeHeadlineField3] =
      body.alternativeHeadlineValue3;
  }

  if (body.archivedAtField1) {
    data["archivedAt"] = {};
    data["archivedAt"]["@type"] = "URL";
    data["archivedAt"][body.archivedAtField1] = body.archivedAtValue1;
  }
  if (body.archivedAtField2) {
    data["archivedAt"][body.archivedAtField2] = body.archivedAtValue2;
  }
  if (body.archivedAtField3) {
    data["archivedAt"][body.archivedAtField3] = body.archivedAtValue3;
  }

  if (body.assessesField1) {
    data["assesses"] = {};
    data["assesses"]["@type"] = "Text";
    data["assesses"][body.assessesField1] = body.assessesValue1;
  }
  if (body.assessesField2) {
    data["assesses"][body.assessesField2] = body.assessesValue2;
  }
  if (body.assessesField3) {
    data["assesses"][body.assessesField3] = body.assessesValue3;
  }

  if (body.associatedMediaField1) {
    data["associatedMedia"] = {};
    data["associatedMedia"]["@type"] = "MediaObject";
    data["associatedMedia"][body.associatedMediaField1] =
      body.associatedMediaValue1;
  }
  if (body.associatedMediaField2) {
    data["associatedMedia"][body.associatedMediaField2] =
      body.associatedMediaValue2;
  }
  if (body.associatedMediaField3) {
    data["associatedMedia"][body.associatedMediaField3] =
      body.associatedMediaValue3;
  }

  if (body.audienceField1) {
    data["audience"] = {};
    data["audience"]["@type"] = "Audience";
    data["audience"][body.audienceField1] = body.audienceValue1;
  }
  if (body.audienceField2) {
    data["audience"][body.audienceField2] = body.audienceValue2;
  }
  if (body.audienceField3) {
    data["audience"][body.audienceField3] = body.audienceValue3;
  }

  if (body.audioField1) {
    data["audio"] = {};
    data["audio"]["@type"] = "AudioObject";
    data["audio"][body.audioField1] = body.audioValue1;
  }
  if (body.audioField2) {
    data["audio"][body.audioField2] = body.audioValue2;
  }
  if (body.audioField3) {
    data["audio"][body.audioField3] = body.audioValue3;
  }

  if (body.authorField1) {
    data["author"] = {};
    data["author"]["@type"] = "Person";
    data["author"][body.authorField1] = body.authorValue1;
  }
  if (body.authorField2) {
    data["author"][body.authorField2] = body.authorValue2;
  }
  if (body.authorField3) {
    data["author"][body.authorField3] = body.authorValue3;
  }

  if (body.awardField1) {
    data["award"] = {};
    data["award"]["@type"] = "Text";
    data["award"][body.awardField1] = body.awardValue1;
  }
  if (body.awardField2) {
    data["award"][body.awardField2] = body.awardValue2;
  }
  if (body.awardField3) {
    data["award"][body.awardField3] = body.awardValue3;
  }

  if (body.characterField1) {
    data["character"] = {};
    data["character"]["@type"] = "Person";
    data["character"][body.characterField1] = body.characterValue1;
  }
  if (body.characterField2) {
    data["character"][body.characterField2] = body.characterValue2;
  }
  if (body.characterField3) {
    data["character"][body.characterField3] = body.characterValue3;
  }

  if (body.citationField1) {
    data["citation"] = {};
    data["citation"]["@type"] = "CreativeWork";
    data["citation"][body.citationField1] = body.citationValue1;
  }
  if (body.citationField2) {
    data["citation"][body.citationField2] = body.citationValue2;
  }
  if (body.citationField3) {
    data["citation"][body.citationField3] = body.citationValue3;
  }

  if (body.commentField1) {
    data["comment"] = {};
    data["comment"]["@type"] = "Comment";
    data["comment"][body.commentField1] = body.commentValue1;
  }
  if (body.commentField2) {
    data["comment"][body.commentField2] = body.commentValue2;
  }
  if (body.commentField3) {
    data["comment"][body.commentField3] = body.commentValue3;
  }

  if (body.commentCountField1) {
    data["commentCount"] = {};
    data["commentCount"]["@type"] = "Integer";
    data["commentCount"][body.commentCountField1] = body.commentCountValue1;
  }
  if (body.commentCountField2) {
    data["commentCount"][body.commentCountField2] = body.commentCountValue2;
  }
  if (body.commentCountField3) {
    data["commentCount"][body.commentCountField3] = body.commentCountValue3;
  }

  if (body.conditionsOfAccessField1) {
    data["conditionsOfAccess"] = {};
    data["conditionsOfAccess"]["@type"] = "Text";
    data["conditionsOfAccess"][body.conditionsOfAccessField1] =
      body.conditionsOfAccessValue1;
  }
  if (body.conditionsOfAccessField2) {
    data["conditionsOfAccess"][body.conditionsOfAccessField2] =
      body.conditionsOfAccessValue2;
  }
  if (body.conditionsOfAccessField3) {
    data["conditionsOfAccess"][body.conditionsOfAccessField3] =
      body.conditionsOfAccessValue3;
  }

  if (body.contentLocationField1) {
    data["contentLocation"] = {};
    data["contentLocation"]["@type"] = "Place";
    data["contentLocation"][body.contentLocationField1] =
      body.contentLocationValue1;
  }
  if (body.contentLocationField2) {
    data["contentLocation"][body.contentLocationField2] =
      body.contentLocationValue2;
  }
  if (body.contentLocationField3) {
    data["contentLocation"][body.contentLocationField3] =
      body.contentLocationValue3;
  }

  if (body.contentRatingField1) {
    data["contentRating"] = {};
    data["contentRating"]["@type"] = "Rating";
    data["contentRating"][body.contentRatingField1] = body.contentRatingValue1;
  }
  if (body.contentRatingField2) {
    data["contentRating"][body.contentRatingField2] = body.contentRatingValue2;
  }
  if (body.contentRatingField3) {
    data["contentRating"][body.contentRatingField3] = body.contentRatingValue3;
  }

  if (body.contentReferenceTimeField1) {
    data["contentReferenceTime"] = {};
    data["contentReferenceTime"]["@type"] = "DateTime";
    data["contentReferenceTime"][body.contentReferenceTimeField1] =
      body.contentReferenceTimeValue1;
  }
  if (body.contentReferenceTimeField2) {
    data["contentReferenceTime"][body.contentReferenceTimeField2] =
      body.contentReferenceTimeValue2;
  }
  if (body.contentReferenceTimeField3) {
    data["contentReferenceTime"][body.contentReferenceTimeField3] =
      body.contentReferenceTimeValue3;
  }

  if (body.contributorField1) {
    data["contributor"] = {};
    data["contributor"]["@type"] = "Person";
    data["contributor"][body.contributorField1] = body.contributorValue1;
  }
  if (body.contributorField2) {
    data["contributor"][body.contributorField2] = body.contributorValue2;
  }
  if (body.contributorField3) {
    data["contributor"][body.contributorField3] = body.contributorValue3;
  }

  if (body.copyrightHolderField1) {
    data["copyrightHolder"] = {};
    data["copyrightHolder"]["@type"] = "Organization";
    data["copyrightHolder"][body.copyrightHolderField1] =
      body.copyrightHolderValue1;
  }
  if (body.copyrightHolderField2) {
    data["copyrightHolder"][body.copyrightHolderField2] =
      body.copyrightHolderValue2;
  }
  if (body.copyrightHolderField3) {
    data["copyrightHolder"][body.copyrightHolderField3] =
      body.copyrightHolderValue3;
  }

  if (body.copyrightNoticeField1) {
    data["copyrightNotice"] = {};
    data["copyrightNotice"]["@type"] = "Text";
    data["copyrightNotice"][body.copyrightNoticeField1] =
      body.copyrightNoticeValue1;
  }
  if (body.copyrightNoticeField2) {
    data["copyrightNotice"][body.copyrightNoticeField2] =
      body.copyrightNoticeValue2;
  }
  if (body.copyrightNoticeField3) {
    data["copyrightNotice"][body.copyrightNoticeField3] =
      body.copyrightNoticeValue3;
  }

  if (body.copyrightYearField1) {
    data["copyrightYear"] = {};
    data["copyrightYear"]["@type"] = "Number";
    data["copyrightYear"][body.copyrightYearField1] = body.copyrightYearValue1;
  }
  if (body.copyrightYearField2) {
    data["copyrightYear"][body.copyrightYearField2] = body.copyrightYearValue2;
  }
  if (body.copyrightYearField3) {
    data["copyrightYear"][body.copyrightYearField3] = body.copyrightYearValue3;
  }

  if (body.correctionField1) {
    data["correction"] = {};
    data["correction"]["@type"] = "CorrectionComment";
    data["correction"][body.correctionField1] = body.correctionValue1;
  }
  if (body.correctionField2) {
    data["correction"][body.correctionField2] = body.correctionValue2;
  }
  if (body.correctionField3) {
    data["correction"][body.correctionField3] = body.correctionValue3;
  }

  if (body.countryOfOriginField1) {
    data["countryOfOrigin"] = {};
    data["countryOfOrigin"]["@type"] = "Country";
    data["countryOfOrigin"][body.countryOfOriginField1] =
      body.countryOfOriginValue1;
  }
  if (body.countryOfOriginField2) {
    data["countryOfOrigin"][body.countryOfOriginField2] =
      body.countryOfOriginValue2;
  }
  if (body.countryOfOriginField3) {
    data["countryOfOrigin"][body.countryOfOriginField3] =
      body.countryOfOriginValue3;
  }

  if (body.creativeWorkStatusField1) {
    data["creativeWorkStatus"] = {};
    data["creativeWorkStatus"]["@type"] = "Text";
    data["creativeWorkStatus"][body.creativeWorkStatusField1] =
      body.creativeWorkStatusValue1;
  }
  if (body.creativeWorkStatusField2) {
    data["creativeWorkStatus"][body.creativeWorkStatusField2] =
      body.creativeWorkStatusValue2;
  }
  if (body.creativeWorkStatusField3) {
    data["creativeWorkStatus"][body.creativeWorkStatusField3] =
      body.creativeWorkStatusValue3;
  }

  if (body.creatorField1) {
    data["creator"] = {};
    data["creator"]["@type"] = "Person";
    data["creator"][body.creatorField1] = body.creatorValue1;
  }
  if (body.creatorField2) {
    data["creator"][body.creatorField2] = body.creatorValue2;
  }
  if (body.creatorField3) {
    data["creator"][body.creatorField3] = body.creatorValue3;
  }

  if (body.creditTextField1) {
    data["creditText"] = {};
    data["creditText"]["@type"] = "Text";
    data["creditText"][body.creditTextField1] = body.creditTextValue1;
  }
  if (body.creditTextField2) {
    data["creditText"][body.creditTextField2] = body.creditTextValue2;
  }
  if (body.creditTextField3) {
    data["creditText"][body.creditTextField3] = body.creditTextValue3;
  }

  if (body.dateCreatedField1) {
    data["dateCreated"] = {};
    data["dateCreated"]["@type"] = "DateTime";
    data["dateCreated"][body.dateCreatedField1] = body.dateCreatedValue1;
  }
  if (body.dateCreatedField2) {
    data["dateCreated"][body.dateCreatedField2] = body.dateCreatedValue2;
  }
  if (body.dateCreatedField3) {
    data["dateCreated"][body.dateCreatedField3] = body.dateCreatedValue3;
  }

  if (body.dateModifiedField1) {
    data["dateModified"] = {};
    data["dateModified"]["@type"] = "DateTime";
    data["dateModified"][body.dateModifiedField1] = body.dateModifiedValue1;
  }
  if (body.dateModifiedField2) {
    data["dateModified"][body.dateModifiedField2] = body.dateModifiedValue2;
  }
  if (body.dateModifiedField3) {
    data["dateModified"][body.dateModifiedField3] = body.dateModifiedValue3;
  }

  if (body.datePublishedField1) {
    data["datePublished"] = {};
    data["datePublished"]["@type"] = "DateTime";
    data["datePublished"][body.datePublishedField1] = body.datePublishedValue1;
  }
  if (body.datePublishedField2) {
    data["datePublished"][body.datePublishedField2] = body.datePublishedValue2;
  }
  if (body.datePublishedField3) {
    data["datePublished"][body.datePublishedField3] = body.datePublishedValue3;
  }

  if (body.discussionUrlField1) {
    data["discussionUrl"] = {};
    data["discussionUrl"]["@type"] = "URL";
    data["discussionUrl"][body.discussionUrlField1] = body.discussionUrlValue1;
  }
  if (body.discussionUrlField2) {
    data["discussionUrl"][body.discussionUrlField2] = body.discussionUrlValue2;
  }
  if (body.discussionUrlField3) {
    data["discussionUrl"][body.discussionUrlField3] = body.discussionUrlValue3;
  }

  if (body.editEIDRField1) {
    data["editEIDR"] = {};
    data["editEIDR"]["@type"] = "Text";
    data["editEIDR"][body.editEIDRField1] = body.editEIDRValue1;
  }
  if (body.editEIDRField2) {
    data["editEIDR"][body.editEIDRField2] = body.editEIDRValue2;
  }
  if (body.editEIDRField3) {
    data["editEIDR"][body.editEIDRField3] = body.editEIDRValue3;
  }

  if (body.editorField1) {
    data["editor"] = {};
    data["editor"]["@type"] = "Person";
    data["editor"][body.editorField1] = body.editorValue1;
  }
  if (body.editorField2) {
    data["editor"][body.editorField2] = body.editorValue2;
  }
  if (body.editorField3) {
    data["editor"][body.editorField3] = body.editorValue3;
  }

  if (body.educationalAlignmentField1) {
    data["educationalAlignment"] = {};
    data["educationalAlignment"]["@type"] = "AlignmentObject";
    data["educationalAlignment"][body.educationalAlignmentField1] =
      body.educationalAlignmentValue1;
  }
  if (body.educationalAlignmentField2) {
    data["educationalAlignment"][body.educationalAlignmentField2] =
      body.educationalAlignmentValue2;
  }
  if (body.educationalAlignmentField3) {
    data["educationalAlignment"][body.educationalAlignmentField3] =
      body.educationalAlignmentValue3;
  }

  if (body.educationalLevelField1) {
    data["educationalLevel"] = {};
    data["educationalLevel"]["@type"] = "Text";
    data["educationalLevel"][body.educationalLevelField1] =
      body.educationalLevelValue1;
  }
  if (body.educationalLevelField2) {
    data["educationalLevel"][body.educationalLevelField2] =
      body.educationalLevelValue2;
  }
  if (body.educationalLevelField3) {
    data["educationalLevel"][body.educationalLevelField3] =
      body.educationalLevelValue3;
  }

  if (body.educationalUseField1) {
    data["educationalUse"] = {};
    data["educationalUse"]["@type"] = "Text";
    data["educationalUse"][body.educationalUseField1] =
      body.educationalUseValue1;
  }
  if (body.educationalUseField2) {
    data["educationalUse"][body.educationalUseField2] =
      body.educationalUseValue2;
  }
  if (body.educationalUseField3) {
    data["educationalUse"][body.educationalUseField3] =
      body.educationalUseValue3;
  }

  if (body.encodingField1) {
    data["encoding"] = {};
    data["encoding"]["@type"] = "MediaObject";
    data["encoding"][body.encodingField1] = body.encodingValue1;
  }
  if (body.encodingField2) {
    data["encoding"][body.encodingField2] = body.encodingValue2;
  }
  if (body.encodingField3) {
    data["encoding"][body.encodingField3] = body.encodingValue3;
  }

  if (body.encodingFormatField1) {
    data["encodingFormat"] = {};
    data["encodingFormat"]["@type"] = "Text";
    data["encodingFormat"][body.encodingFormatField1] =
      body.encodingFormatValue1;
  }
  if (body.encodingFormatField2) {
    data["encodingFormat"][body.encodingFormatField2] =
      body.encodingFormatValue2;
  }
  if (body.encodingFormatField3) {
    data["encodingFormat"][body.encodingFormatField3] =
      body.encodingFormatValue3;
  }

  if (body.exampleOfWorkField1) {
    data["exampleOfWork"] = {};
    data["exampleOfWork"]["@type"] = "CreativeWork";
    data["exampleOfWork"][body.exampleOfWorkField1] = body.exampleOfWorkValue1;
  }
  if (body.exampleOfWorkField2) {
    data["exampleOfWork"][body.exampleOfWorkField2] = body.exampleOfWorkValue2;
  }
  if (body.exampleOfWorkField3) {
    data["exampleOfWork"][body.exampleOfWorkField3] = body.exampleOfWorkValue3;
  }

  if (body.expiresField1) {
    data["expires"] = {};
    data["expires"]["@type"] = "Date";
    data["expires"][body.expiresField1] = body.expiresValue1;
  }
  if (body.expiresField2) {
    data["expires"][body.expiresField2] = body.expiresValue2;
  }
  if (body.expiresField3) {
    data["expires"][body.expiresField3] = body.expiresValue3;
  }

  if (body.funderField1) {
    data["funder"] = {};
    data["funder"]["@type"] = "Organization";
    data["funder"][body.funderField1] = body.funderValue1;
  }
  if (body.funderField2) {
    data["funder"][body.funderField2] = body.funderValue2;
  }
  if (body.funderField3) {
    data["funder"][body.funderField3] = body.funderValue3;
  }

  if (body.fundingField1) {
    data["funding"] = {};
    data["funding"]["@type"] = "___";
    data["funding"][body.fundingField1] = body.fundingValue1;
  }
  if (body.fundingField2) {
    data["funding"][body.fundingField2] = body.fundingValue2;
  }
  if (body.fundingField3) {
    data["funding"][body.fundingField3] = body.fundingValue3;
  }

  if (body.genreField1) {
    data["genre"] = {};
    data["genre"]["@type"] = "Text";
    data["genre"][body.genreField1] = body.genreValue1;
  }
  if (body.genreField2) {
    data["genre"][body.genreField2] = body.genreValue2;
  }
  if (body.genreField3) {
    data["genre"][body.genreField3] = body.genreValue3;
  }

  if (body.hasPartField1) {
    data["hasPart"] = {};
    data["hasPart"]["@type"] = "CreativeWork";
    data["hasPart"][body.hasPartField1] = body.hasPartValue1;
  }
  if (body.hasPartField2) {
    data["hasPart"][body.hasPartField2] = body.hasPartValue2;
  }
  if (body.hasPartField3) {
    data["hasPart"][body.hasPartField3] = body.hasPartValue3;
  }

  if (body.headlineField1) {
    data["headline"] = {};
    data["headline"]["@type"] = "Text";
    data["headline"][body.headlineField1] = body.headlineValue1;
  }
  if (body.headlineField2) {
    data["headline"][body.headlineField2] = body.headlineValue2;
  }
  if (body.headlineField3) {
    data["headline"][body.headlineField3] = body.headlineValue3;
  }

  if (body.inLanguageField1) {
    data["inLanguage"] = {};
    data["inLanguage"]["@type"] = "Language";
    data["inLanguage"][body.inLanguageField1] = body.inLanguageValue1;
  }
  if (body.inLanguageField2) {
    data["inLanguage"][body.inLanguageField2] = body.inLanguageValue2;
  }
  if (body.inLanguageField3) {
    data["inLanguage"][body.inLanguageField3] = body.inLanguageValue3;
  }

  if (body.interactivityTypeField1) {
    data["interactivityType"] = {};
    data["interactivityType"]["@type"] = "Text";
    data["interactivityType"][body.interactivityTypeField1] = body.Value1;
  }
  if (body.interactivityTypeField2) {
    data["interactivityType"][body.interactivityTypeField2] = body.Value2;
  }
  if (body.interactivityTypeField3) {
    data["interactivityType"][body.interactivityTypeField3] = body.Value3;
  }

  if (body.interpretedAsClaimField1) {
    data["interpretedAsClaim"] = {};
    data["interpretedAsClaim"]["@type"] = "Claim";
    data["interpretedAsClaim"][body.interpretedAsClaimField1] =
      body.interpretedAsClaimValue1;
  }
  if (body.interpretedAsClaimField2) {
    data["interpretedAsClaim"][body.interpretedAsClaimField2] =
      body.interpretedAsClaimValue2;
  }
  if (body.interpretedAsClaimField3) {
    data["interpretedAsClaim"][body.interpretedAsClaimField3] =
      body.interpretedAsClaimValue3;
  }

  if (body.isBasedOnField1) {
    data["isBasedOn"] = {};
    data["isBasedOn"]["@type"] = "Product";
    data["isBasedOn"][body.isBasedOnField1] = body.isBasedOnValue1;
  }
  if (body.isBasedOnField2) {
    data["isBasedOn"][body.isBasedOnField2] = body.isBasedOnValue2;
  }
  if (body.isBasedOnField3) {
    data["isBasedOn"][body.isBasedOnField3] = body.isBasedOnValue3;
  }

  if (body.isAccessibleForFreeField1) {
    data["isAccessibleForFree"] = {};
    data["isAccessibleForFree"]["@type"] = "Boolean";
    data["isAccessibleForFree"][body.isAccessibleForFreeField1] =
      body.isAccessibleForFreeValue1;
  }
  if (body.isAccessibleForFreeField2) {
    data["isAccessibleForFree"][body.isAccessibleForFreeField2] =
      body.isAccessibleForFreeValue2;
  }
  if (body.isAccessibleForFreeField3) {
    data["isAccessibleForFree"][body.isAccessibleForFreeField3] =
      body.isAccessibleForFreeValue3;
  }

  if (body.isFamilyFriendlyField1) {
    data["isFamilyFriendly"] = {};
    data["isFamilyFriendly"]["@type"] = "Boolean";
    data["isFamilyFriendly"][body.isFamilyFriendlyField1] =
      body.isFamilyFriendlyValue1;
  }
  if (body.isFamilyFriendlyField2) {
    data["isFamilyFriendly"][body.isFamilyFriendlyField2] =
      body.isFamilyFriendlyValue2;
  }
  if (body.isFamilyFriendlyField3) {
    data["isFamilyFriendly"][body.isFamilyFriendlyField3] =
      body.isFamilyFriendlyValue3;
  }

  if (body.isPartOfField1) {
    data["isPartOf"] = {};
    data["isPartOf"]["@type"] = "CreativeWork";
    data["isPartOf"][body.isPartOfField1] = body.isPartOfValue1;
  }
  if (body.isPartOfField2) {
    data["isPartOf"][body.isPartOfField2] = body.isPartOfValue2;
  }
  if (body.isPartOfField3) {
    data["isPartOf"][body.isPartOfField3] = body.isPartOfValue3;
  }

  if (body.learningResourceTypeField1) {
    data["learningResourceType"] = {};
    data["learningResourceType"]["@type"] = "Text";
    data["learningResourceType"][body.learningResourceTypeField1] =
      body.learningResourceTypeValue1;
  }
  if (body.learningResourceTypeField2) {
    data["learningResourceType"][body.learningResourceTypeField2] =
      body.learningResourceTypeValue2;
  }
  if (body.learningResourceTypeField3) {
    data["learningResourceType"][body.learningResourceTypeField3] =
      body.learningResourceTypeValue3;
  }

  if (body.licenseField1) {
    data["license"] = {};
    data["license"]["@type"] = "CreativeWork";
    data["license"][body.licenseField1] = body.licenseValue1;
  }
  if (body.licenseField2) {
    data["license"][body.licenseField2] = body.licenseValue2;
  }
  if (body.licenseField3) {
    data["license"][body.licenseField3] = body.licenseValue3;
  }

  if (body.locationCreatedField1) {
    data["locationCreated"] = {};
    data["locationCreated"]["@type"] = "Place";
    data["locationCreated"][body.locationCreatedField1] =
      body.locationCreatedValue1;
  }
  if (body.locationCreatedField2) {
    data["locationCreated"][body.locationCreatedField2] =
      body.locationCreatedValue2;
  }
  if (body.locationCreatedField3) {
    data["locationCreated"][body.locationCreatedField3] =
      body.locationCreatedValue3;
  }

  if (body.mainEntityField1) {
    data["mainEntity"] = {};
    data["mainEntity"]["@type"] = "Thing";
    data["mainEntity"][body.mainEntityField1] = body.mainEntityValue1;
  }
  if (body.mainEntityField2) {
    data["mainEntity"][body.mainEntityField2] = body.mainEntityValue2;
  }
  if (body.mainEntityField3) {
    data["mainEntity"][body.mainEntityField3] = body.mainEntityValue3;
  }

  if (body.maintainerField1) {
    data["maintainer"] = {};
    data["maintainer"]["@type"] = "Person";
    data["maintainer"][body.maintainerField1] = body.maintainerValue1;
  }
  if (body.maintainerField2) {
    data["maintainer"][body.maintainerField2] = body.maintainerValue2;
  }
  if (body.maintainerField3) {
    data["maintainer"][body.maintainerField3] = body.maintainerValue3;
  }

  if (body.materialField1) {
    data["material"] = {};
    data["material"]["@type"] = "Product";
    data["material"][body.materialField1] = body.materialValue1;
  }
  if (body.materialField2) {
    data["material"][body.materialField2] = body.materialValue2;
  }
  if (body.materialField3) {
    data["material"][body.materialField3] = body.materialValue3;
  }

  if (body.materialExtentField1) {
    data["materialExtent"] = {};
    data["materialExtent"]["@type"] = "QuantitativeValue";
    data["materialExtent"][body.materialExtentField1] =
      body.materialExtentValue1;
  }
  if (body.materialExtentField2) {
    data["materialExtent"][body.materialExtentField2] =
      body.materialExtentValue2;
  }
  if (body.materialExtentField3) {
    data["materialExtent"][body.materialExtentField3] =
      body.materialExtentValue3;
  }

  if (body.mentionsField1) {
    data["mentions"] = {};
    data["mentions"]["@type"] = "Thing";
    data["mentions"][body.mentionsField1] = body.mentionsValue1;
  }
  if (body.mentionsField2) {
    data["mentions"][body.mentionsField2] = body.mentionsValue2;
  }
  if (body.mentionsField3) {
    data["mentions"][body.mentionsField3] = body.mentionsValue3;
  }

  if (body.offersField1) {
    data["offers"] = {};
    data["offers"]["@type"] = "___";
    data["offers"][body.offersField1] = body.offersValue1;
  }
  if (body.offersField2) {
    data["offers"][body.offersField2] = body.offersValue2;
  }
  if (body.offersField3) {
    data["offers"][body.offersField3] = body.offersValue3;
  }

  if (body.patternField1) {
    data["pattern"] = {};
    data["pattern"]["@type"] = "Text";
    data["pattern"][body.patternField1] = body.patternValue1;
  }
  if (body.patternField2) {
    data["pattern"][body.patternField2] = body.patternValue2;
  }
  if (body.patternField3) {
    data["pattern"][body.patternField3] = body.patternValue3;
  }

  if (body.positionField1) {
    data["position"] = {};
    data["position"]["@type"] = "Integer";
    data["position"][body.positionField1] = body.positionValue1;
  }
  if (body.positionField2) {
    data["position"][body.positionField2] = body.positionValue2;
  }
  if (body.positionField3) {
    data["position"][body.positionField3] = body.positionValue3;
  }

  if (body.producerField1) {
    data["producer"] = {};
    data["producer"]["@type"] = "Person";
    data["producer"][body.producerField1] = body.producerValue1;
  }
  if (body.producerField2) {
    data["producer"][body.producerField2] = body.producerValue2;
  }
  if (body.producerField3) {
    data["producer"][body.producerField3] = body.producerValue3;
  }

  if (body.providerField1) {
    data["provider"] = {};
    data["provider"]["@type"] = "Organization";
    data["provider"][body.providerField1] = body.providerValue1;
  }
  if (body.providerField2) {
    data["provider"][body.providerField2] = body.providerValue2;
  }
  if (body.providerField3) {
    data["provider"][body.providerField3] = body.providerValue3;
  }

  if (body.publicationField1) {
    data["publication"] = {};
    data["publication"]["@type"] = "___";
    data["publication"][body.publicationField1] = body.publicationValue1;
  }
  if (body.publicationField2) {
    data["publication"][body.publicationField2] = body.publicationValue2;
  }
  if (body.publicationField3) {
    data["publication"][body.publicationField3] = body.publicationValue3;
  }

  if (body.publisherField1) {
    data["publisher"] = {};
    data["publisher"]["@type"] = "Organization";
    data["publisher"][body.publisherField1] = body.publisherValue1;
  }
  if (body.publisherField2) {
    data["publisher"][body.publisherField2] = body.publisherValue2;
  }
  if (body.publisherField3) {
    data["publisher"][body.publisherField3] = body.publisherValue3;
  }

  if (body.publisherImprintField1) {
    data["publisherImprint"] = {};
    data["publisherImprint"]["@type"] = "Organization";
    data["publisherImprint"][body.publisherImprintField1] =
      body.publisherImprintValue1;
  }
  if (body.publisherImprintField2) {
    data["publisherImprint"][body.publisherImprintField2] =
      body.publisherImprintValue2;
  }
  if (body.publisherImprintField3) {
    data["publisherImprint"][body.publisherImprintField3] =
      body.publisherImprintValue3;
  }

  if (body.publishingPrinciplesField1) {
    data["publishingPrinciples"] = {};
    data["publishingPrinciples"]["@type"] = "CreativeWork";
    data["publishingPrinciples"][body.publishingPrinciplesField1] =
      body.publishingPrinciplesValue1;
  }
  if (body.publishingPrinciplesField2) {
    data["publishingPrinciples"][body.publishingPrinciplesField2] =
      body.publishingPrinciplesValue2;
  }
  if (body.publishingPrinciplesField3) {
    data["publishingPrinciples"][body.publishingPrinciplesField3] =
      body.publishingPrinciplesValue3;
  }

  if (body.recordedAtField1) {
    data["recordedAt"] = {};
    data["recordedAt"]["@type"] = "Event";
    data["recordedAt"][body.recordedAtField1] = body.recordedAtValue1;
  }
  if (body.recordedAtField2) {
    data["recordedAt"][body.recordedAtField2] = body.recordedAtValue2;
  }
  if (body.recordedAtField3) {
    data["recordedAt"][body.recordedAtField3] = body.recordedAtValue3;
  }

  if (body.releasedEventField1) {
    data["releasedEvent"] = {};
    data["releasedEvent"]["@type"] = "___";
    data["releasedEvent"][body.releasedEventField1] = body.releasedEventValue1;
  }
  if (body.releasedEventField2) {
    data["releasedEvent"][body.releasedEventField2] = body.releasedEventValue2;
  }
  if (body.releasedEventField3) {
    data["releasedEvent"][body.releasedEventField3] = body.releasedEventValue3;
  }

  if (body.reviewField1) {
    data["review"] = {};
    data["review"]["@type"] = "___";
    data["review"][body.reviewField1] = body.reviewValue1;
  }
  if (body.reviewField2) {
    data["review"][body.reviewField2] = body.reviewValue2;
  }
  if (body.reviewField3) {
    data["review"][body.reviewField3] = body.reviewValue3;
  }

  if (body.schemaVersionField1) {
    data["schemaVersion"] = {};
    data["schemaVersion"]["@type"] = "Text";
    data["schemaVersion"][body.schemaVersionField1] = body.schemaVersionValue1;
  }
  if (body.schemaVersionField2) {
    data["schemaVersion"][body.schemaVersionField2] = body.schemaVersionValue2;
  }
  if (body.schemaVersionField3) {
    data["schemaVersion"][body.schemaVersionField3] = body.schemaVersionValue3;
  }

  if (body.sdDatePublishedField1) {
    data["sdDatePublished"] = {};
    data["sdDatePublished"]["@type"] = "Date";
    data["sdDatePublished"][body.sdDatePublishedField1] =
      body.sdDatePublishedValue1;
  }
  if (body.sdDatePublishedField2) {
    data["sdDatePublished"][body.sdDatePublishedField2] =
      body.sdDatePublishedValue2;
  }
  if (body.sdDatePublishedField3) {
    data["sdDatePublished"][body.sdDatePublishedField3] =
      body.sdDatePublishedValue3;
  }

  if (body.sdLicenseField1) {
    data["sdLicense"] = {};
    data["sdLicense"]["@type"] = "CreativeWork";
    data["sdLicense"][body.sdLicenseField1] = body.sdLicenseValue1;
  }
  if (body.sdLicenseField2) {
    data["sdLicense"][body.sdLicenseField2] = body.sdLicenseValue2;
  }
  if (body.sdLicenseField3) {
    data["sdLicense"][body.sdLicenseField3] = body.sdLicenseValue3;
  }

  if (body.sdPublisherField1) {
    data["sdPublisher"] = {};
    data["sdPublisher"]["@type"] = "Organization";
    data["sdPublisher"][body.sdPublisherField1] = body.sdPublisherValue1;
  }
  if (body.sdPublisherField2) {
    data["sdPublisher"][body.sdPublisherField2] = body.sdPublisherValue2;
  }
  if (body.sdPublisherField3) {
    data["sdPublisher"][body.sdPublisherField3] = body.sdPublisherValue3;
  }

  if (body.sizeField1) {
    data["size"] = {};
    data["size"]["@type"] = "QuantitativeValue";
    data["size"][body.sizeField1] = body.sizeValue1;
  }
  if (body.sizeField2) {
    data["size"][body.sizeField2] = body.sizeValue2;
  }
  if (body.sizeField3) {
    data["size"][body.sizeField3] = body.sizeValue3;
  }

  if (body.sourceOrganizationField1) {
    data["sourceOrganization"] = {};
    data["sourceOrganization"]["@type"] = "Organization";
    data["sourceOrganization"][body.sourceOrganizationField1] =
      body.sourceOrganizationValue1;
  }
  if (body.sourceOrganizationField2) {
    data["sourceOrganization"][body.sourceOrganizationField2] =
      body.sourceOrganizationValue2;
  }
  if (body.sourceOrganizationField3) {
    data["sourceOrganization"][body.sourceOrganizationField3] =
      body.sourceOrganizationValue3;
  }

  if (body.spatialField1) {
    data["spatial"] = {};
    data["spatial"]["@type"] = "Place";
    data["spatial"][body.spatialField1] = body.spatialValue1;
  }
  if (body.spatialField2) {
    data["spatial"][body.spatialField2] = body.spatialValue2;
  }
  if (body.spatialField3) {
    data["spatial"][body.spatialField3] = body.spatialValue3;
  }

  if (body.spatialCoverageField1) {
    data["spatialCoverage"] = {};
    data["spatialCoverage"]["@type"] = "Place";
    data["spatialCoverage"][body.spatialCoverageField1] =
      body.spatialCoverageValue1;
  }
  if (body.spatialCoverageField2) {
    data["spatialCoverage"][body.spatialCoverageField2] =
      body.spatialCoverageValue2;
  }
  if (body.spatialCoverageField3) {
    data["spatialCoverage"][body.spatialCoverageField3] =
      body.spatialCoverageValue3;
  }

  if (body.sponsorField1) {
    data["sponsor"] = {};
    data["sponsor"]["@type"] = "Organization";
    data["sponsor"][body.sponsorField1] = body.sponsorValue1;
  }
  if (body.sponsorField2) {
    data["sponsor"][body.sponsorField2] = body.sponsorValue2;
  }
  if (body.sponsorField3) {
    data["sponsor"][body.sponsorField3] = body.sponsorValue3;
  }

  if (body.teachesField1) {
    data["teaches"] = {};
    data["teaches"]["@type"] = "Text";
    data["teaches"][body.teachesField1] = body.teachesValue1;
  }
  if (body.teachesField2) {
    data["teaches"][body.teachesField2] = body.teachesValue2;
  }
  if (body.teachesField3) {
    data["teaches"][body.teachesField3] = body.teachesValue3;
  }

  if (body.temporalField1) {
    data["temporal"] = {};
    data["temporal"]["@type"] = "DateTime";
    data["temporal"][body.temporalField1] = body.temporalValue1;
  }
  if (body.temporalField2) {
    data["temporal"][body.temporalField2] = body.temporalValue2;
  }
  if (body.temporalField3) {
    data["temporal"][body.temporalField3] = body.temporalValue3;
  }

  if (body.temporalCoverageField1) {
    data["temporalCoverage"] = {};
    data["temporalCoverage"]["@type"] = "DateTime";
    data["temporalCoverage"][body.temporalCoverageField1] =
      body.temporalCoverageValue1;
  }
  if (body.temporalCoverageField2) {
    data["temporalCoverage"][body.temporalCoverageField2] =
      body.temporalCoverageValue2;
  }
  if (body.temporalCoverageField3) {
    data["temporalCoverage"][body.temporalCoverageField3] =
      body.temporalCoverageValue3;
  }

  if (body.textField1) {
    data["text"] = {};
    data["text"]["@type"] = "Text";
    data["text"][body.textField1] = body.textValue1;
  }
  if (body.textField2) {
    data["text"][body.textField2] = body.textValue2;
  }
  if (body.textField3) {
    data["text"][body.textField3] = body.textValue3;
  }

  if (body.thumbnailUrlField1) {
    data["thumbnailUrl"] = {};
    data["thumbnailUrl"]["@type"] = "URL";
    data["thumbnailUrl"][body.thumbnailUrlField1] = body.thumbnailUrlValue1;
  }
  if (body.thumbnailUrlField2) {
    data["thumbnailUrl"][body.thumbnailUrlField2] = body.thumbnailUrlValue2;
  }
  if (body.thumbnailUrlField3) {
    data["thumbnailUrl"][body.thumbnailUrlField3] = body.thumbnailUrlValue3;
  }

  if (body.timeRequiredField1) {
    data["timeRequired"] = {};
    data["timeRequired"]["@type"] = "Duration";
    data["timeRequired"][body.timeRequiredField1] = body.timeRequiredValue1;
  }
  if (body.timeRequiredField2) {
    data["timeRequired"][body.timeRequiredField2] = body.timeRequiredValue2;
  }
  if (body.timeRequiredField3) {
    data["timeRequired"][body.timeRequiredField3] = body.timeRequiredValue3;
  }

  if (body.translationOfWorkField1) {
    data["translationOfWork"] = {};
    data["translationOfWork"]["@type"] = "CreativeWork";
    data["translationOfWork"][body.translationOfWorkField1] =
      body.translationOfWorkValue1;
  }
  if (body.translationOfWorkField2) {
    data["translationOfWork"][body.translationOfWorkField2] =
      body.translationOfWorkValue2;
  }
  if (body.translationOfWorkField3) {
    data["translationOfWork"][body.translationOfWorkField3] =
      body.translationOfWorkValue3;
  }

  if (body.translatorField1) {
    data["translator"] = {};
    data["translator"]["@type"] = "Person";
    data["translator"][body.translatorField1] = body.translatorValue1;
  }
  if (body.translatorField2) {
    data["translator"][body.translatorField2] = body.translatorValue2;
  }
  if (body.translatorField3) {
    data["translator"][body.translatorField3] = body.translatorValue3;
  }

  if (body.typicalAgeRangeField1) {
    data["typicalAgeRange"] = {};
    data["typicalAgeRange"]["@type"] = "Text";
    data["typicalAgeRange"][body.typicalAgeRangeField1] =
      body.typicalAgeRangeValue1;
  }
  if (body.typicalAgeRangeField2) {
    data["typicalAgeRange"][body.typicalAgeRangeField2] =
      body.typicalAgeRangeValue2;
  }
  if (body.typicalAgeRangeField3) {
    data["typicalAgeRange"][body.typicalAgeRangeField3] =
      body.typicalAgeRangeValue3;
  }

  if (body.usageInfoField1) {
    data["usageInfo"] = {};
    data["usageInfo"]["@type"] = "CreativeWork";
    data["usageInfo"][body.usageInfoField1] = body.usageInfoValue1;
  }
  if (body.usageInfoField2) {
    data["usageInfo"][body.usageInfoField2] = body.usageInfoValue2;
  }
  if (body.usageInfoField3) {
    data["usageInfo"][body.usageInfoField3] = body.usageInfoValue3;
  }

  if (body.versionField1) {
    data["version"] = {};
    data["version"]["@type"] = "Number";
    data["version"][body.versionField1] = body.versionValue1;
  }
  if (body.versionField2) {
    data["version"][body.versionField2] = body.versionValue2;
  }
  if (body.versionField3) {
    data["version"][body.versionField3] = body.versionValue3;
  }

  if (body.videoField1) {
    data["video"] = {};
    data["video"]["@type"] = "VideoObject";
    data["video"][body.videoField1] = body.videoValue1;
  }
  if (body.videoField2) {
    data["video"][body.videoField2] = body.videoValue2;
  }
  if (body.videoField3) {
    data["video"][body.videoField3] = body.videoValue3;
  }

  if (body.workExampleField1) {
    data["workExample"] = {};
    data["workExample"]["@type"] = "CreativeWork";
    data["workExample"][body.workExampleField1] = body.workExampleValue1;
  }
  if (body.workExampleField2) {
    data["workExample"][body.workExampleField2] = body.workExampleValue2;
  }
  if (body.workExampleField3) {
    data["workExample"][body.workExampleField3] = body.workExampleValue3;
  }

  if (body.workTranslationField1) {
    data["workTranslation"] = {};
    data["workTranslation"]["@type"] = "CreativeWork";
    data["workTranslation"][body.workTranslationField1] =
      body.workTranslationValue1;
  }
  if (body.workTranslationField2) {
    data["workTranslation"][body.workTranslationField2] =
      body.workTranslationValue2;
  }
  if (body.workTranslationField3) {
    data["workTranslation"][body.workTranslationField3] =
      body.workTranslationValue3;
  }

  if (body.actorField1) {
    data["actor"] = {};
    data["actor"]["@type"] = "Person";
    data["actor"][body.actorField1] = body.actorValue1;
  }
  if (body.actorField2) {
    data["actor"][body.actorField2] = body.actorValue2;
  }
  if (body.actorField3) {
    data["actor"][body.actorField3] = body.actorValue3;
  }

  if (body.attendeeField1) {
    data["attendee"] = {};
    data["attendee"]["@type"] = "Person";
    data["attendee"][body.attendeeField1] = body.attendeeValue1;
  }
  if (body.attendeeField2) {
    data["attendee"][body.attendeeField2] = body.attendeeValue2;
  }
  if (body.attendeeField3) {
    data["attendee"][body.attendeeField3] = body.attendeeValue3;
  }

  if (body.composerField1) {
    data["composer"] = {};
    data["composer"]["@type"] = "Person";
    data["composer"][body.composerField1] = body.composerValue1;
  }
  if (body.composerField2) {
    data["composer"][body.composerField2] = body.composerValue2;
  }
  if (body.composerField3) {
    data["composer"][body.composerField3] = body.composerValue3;
  }

  if (body.directorField1) {
    data["director"] = {};
    data["director"]["@type"] = "___";
    data["director"][body.directorField1] = body.directorValue1;
  }
  if (body.directorField2) {
    data["director"][body.directorField2] = body.directorValue2;
  }
  if (body.directorField3) {
    data["director"][body.directorField3] = body.directorValue3;
  }

  if (body.doorTimeField1) {
    data["doorTime"] = {};
    data["doorTime"]["@type"] = "DateTime";
    data["doorTime"][body.doorTimeField1] = body.doorTimeValue1;
  }
  if (body.doorTimeField2) {
    data["doorTime"][body.doorTimeField2] = body.doorTimeValue2;
  }
  if (body.doorTimeField3) {
    data["doorTime"][body.doorTimeField3] = body.doorTimeValue3;
  }

  if (body.durationField1) {
    data["duration"] = {};
    data["duration"]["@type"] = "Duration";
    data["duration"][body.durationField1] = body.durationValue1;
  }
  if (body.durationField2) {
    data["duration"][body.durationField2] = body.durationValue2;
  }
  if (body.durationField3) {
    data["duration"][body.durationField3] = body.durationValue3;
  }

  if (body.endDateField1) {
    data["endDate"] = {};
    data["endDate"]["@type"] = "DateTime";
    data["endDate"][body.endDateField1] = body.endDateValue1;
  }
  if (body.endDateField2) {
    data["endDate"][body.endDateField2] = body.endDateValue2;
  }
  if (body.endDateField3) {
    data["endDate"][body.endDateField3] = body.endDateValue3;
  }

  if (body.eventAttendanceModeField1) {
    data["eventAttendanceMode"] = {};
    data["eventAttendanceMode"]["@type"] = "EventAttendanceModeEnumeration";
    data["eventAttendanceMode"][body.eventAttendanceModeField1] =
      body.eventAttendanceModeValue1;
  }
  if (body.eventAttendanceModeField2) {
    data["eventAttendanceMode"][body.eventAttendanceModeField2] =
      body.eventAttendanceModeValue2;
  }
  if (body.eventAttendanceModeField3) {
    data["eventAttendanceMode"][body.eventAttendanceModeField3] =
      body.eventAttendanceModeValue3;
  }

  if (body.eventScheduleField1) {
    data["eventSchedule"] = {};
    data["eventSchedule"]["@type"] = "Schedule";
    data["eventSchedule"][body.eventScheduleField1] = body.eventScheduleValue1;
  }
  if (body.eventScheduleField2) {
    data["eventSchedule"][body.eventScheduleField2] = body.eventScheduleValue2;
  }
  if (body.eventScheduleField3) {
    data["eventSchedule"][body.eventScheduleField3] = body.eventScheduleValue3;
  }

  if (body.eventStatusField1) {
    data["eventStatus"] = {};
    data["eventStatus"]["@type"] = "EventStatusType";
    data["eventStatus"][body.eventStatusField1] = body.eventStatusValue1;
  }
  if (body.eventStatusField2) {
    data["eventStatus"][body.eventStatusField2] = body.eventStatusValue2;
  }
  if (body.eventStatusField3) {
    data["eventStatus"][body.eventStatusField3] = body.eventStatusValue3;
  }

  if (body.maximumAttendeeCapacityField1) {
    data["maximumAttendeeCapacity"] = {};
    data["maximumAttendeeCapacity"]["@type"] = "Integer";
    data["maximumAttendeeCapacity"][body.maximumAttendeeCapacityField1] =
      body.maximumAttendeeCapacityValue1;
  }
  if (body.maximumAttendeeCapacityField2) {
    data["maximumAttendeeCapacity"][body.maximumAttendeeCapacityField2] =
      body.maximumAttendeeCapacityValue2;
  }
  if (body.maximumAttendeeCapacityField3) {
    data["maximumAttendeeCapacity"][body.maximumAttendeeCapacityField3] =
      body.maximumAttendeeCapacityValue3;
  }

  if (body.maximumPhysicalAttendeeCapacityField1) {
    data["maximumPhysicalAttendeeCapacity"] = {};
    data["maximumPhysicalAttendeeCapacity"]["@type"] = "Integer";
    data["maximumPhysicalAttendeeCapacity"][
      body.maximumPhysicalAttendeeCapacityField1
    ] = body.maximumPhysicalAttendeeCapacityValue1;
  }
  if (body.maximumPhysicalAttendeeCapacityField2) {
    data["maximumPhysicalAttendeeCapacity"][
      body.maximumPhysicalAttendeeCapacityField2
    ] = body.maximumPhysicalAttendeeCapacityValue2;
  }
  if (body.maximumPhysicalAttendeeCapacityField3) {
    data["maximumPhysicalAttendeeCapacity"][
      body.maximumPhysicalAttendeeCapacityField3
    ] = body.maximumPhysicalAttendeeCapacityValue3;
  }

  if (body.maximumVirtualAttendeeCapacityField1) {
    data["maximumVirtualAttendeeCapacity"] = {};
    data["maximumVirtualAttendeeCapacity"]["@type"] = "Integer";
    data["maximumVirtualAttendeeCapacity"][
      body.maximumVirtualAttendeeCapacityField1
    ] = body.maximumVirtualAttendeeCapacityValue1;
  }
  if (body.maximumVirtualAttendeeCapacityField2) {
    data["maximumVirtualAttendeeCapacity"][
      body.maximumVirtualAttendeeCapacityField2
    ] = body.maximumVirtualAttendeeCapacityValue2;
  }
  if (body.maximumVirtualAttendeeCapacityField3) {
    data["maximumVirtualAttendeeCapacity"][
      body.maximumVirtualAttendeeCapacityField3
    ] = body.maximumVirtualAttendeeCapacityValue3;
  }

  if (body.organizerField1) {
    data["organizer"] = {};
    data["organizer"]["@type"] = "Organization";
    data["organizer"][body.organizerField1] = body.organizerValue1;
  }
  if (body.organizerField2) {
    data["organizer"][body.organizerField2] = body.organizerValue2;
  }
  if (body.organizerField3) {
    data["organizer"][body.organizerField3] = body.organizerValue3;
  }

  if (body.performerField1) {
    data["performer"] = {};
    data["performer"]["@type"] = "Person";
    data["performer"][body.performerField1] = body.performerValue1;
  }
  if (body.performerField2) {
    data["performer"][body.performerField2] = body.performerValue2;
  }
  if (body.performerField3) {
    data["performer"][body.performerField3] = body.performerValue3;
  }

  if (body.previousStartDateField1) {
    data["previousStartDate"] = {};
    data["previousStartDate"]["@type"] = "Date";
    data["previousStartDate"][body.previousStartDateField1] =
      body.previousStartDateValue1;
  }
  if (body.previousStartDateField2) {
    data["previousStartDate"][body.previousStartDateField2] =
      body.previousStartDateValue2;
  }
  if (body.previousStartDateField3) {
    data["previousStartDate"][body.previousStartDateField3] =
      body.previousStartDateValue3;
  }

  if (body.recordedInField1) {
    data["recordedIn"] = {};
    data["recordedIn"]["@type"] = "CreativeWork";
    data["recordedIn"][body.recordedInField1] = body.recordedInValue1;
  }
  if (body.recordedInField2) {
    data["recordedIn"][body.recordedInField2] = body.recordedInValue2;
  }
  if (body.recordedInField3) {
    data["recordedIn"][body.recordedInField3] = body.recordedInValue3;
  }

  if (body.remainingAttendeeCapacityField1) {
    data["remainingAttendeeCapacity"] = {};
    data["remainingAttendeeCapacity"]["@type"] = "Integer";
    data["remainingAttendeeCapacity"][body.remainingAttendeeCapacityField1] =
      body.remainingAttendeeCapacityValue1;
  }
  if (body.remainingAttendeeCapacityField2) {
    data["remainingAttendeeCapacity"][body.remainingAttendeeCapacityField2] =
      body.remainingAttendeeCapacityValue2;
  }
  if (body.remainingAttendeeCapacityField3) {
    data["remainingAttendeeCapacity"][body.remainingAttendeeCapacityField3] =
      body.remainingAttendeeCapacityValue3;
  }

  if (body.subEventField1) {
    data["subEvent"] = {};
    data["subEvent"]["@type"] = "Event";
    data["subEvent"][body.subEventField1] = body.subEventValue1;
  }
  if (body.subEventField2) {
    data["subEvent"][body.subEventField2] = body.subEventValue2;
  }
  if (body.subEventField3) {
    data["subEvent"][body.subEventField3] = body.subEventValue3;
  }

  if (body.superEventField1) {
    data["superEvent"] = {};
    data["superEvent"]["@type"] = "Event";
    data["superEvent"][body.superEventField1] = body.superEventValue1;
  }
  if (body.superEventField2) {
    data["superEvent"][body.superEventField2] = body.superEventValue2;
  }
  if (body.superEventField3) {
    data["superEvent"][body.superEventField3] = body.superEventValue3;
  }

  if (body.workFeaturedField1) {
    data["workFeatured"] = {};
    data["workFeatured"]["@type"] = "CreativeWork";
    data["workFeatured"][body.workFeaturedField1] = body.workFeaturedValue1;
  }
  if (body.workFeaturedField2) {
    data["workFeatured"][body.workFeaturedField2] = body.workFeaturedValue2;
  }
  if (body.workFeaturedField3) {
    data["workFeatured"][body.workFeaturedField3] = body.workFeaturedValue3;
  }

  if (body.workPerformedField1) {
    data["workPerformed"] = {};
    data["workPerformed"]["@type"] = "CreativeWork";
    data["workPerformed"][body.workPerformedField1] = body.workPerformedValue1;
  }
  if (body.workPerformedField2) {
    data["workPerformed"][body.workPerformedField2] = body.workPerformedValue2;
  }
  if (body.workPerformedField3) {
    data["workPerformed"][body.workPerformedField3] = body.workPerformedValue3;
  }

  if (body.additionalTypeField1) {
    data["additionalType"] = {};
    data["additionalType"]["@type"] = "URL";
    data["additionalType"][body.additionalTypeField1] =
      body.additionalTypeValue1;
  }
  if (body.additionalTypeField2) {
    data["additionalType"][body.additionalTypeField2] =
      body.additionalTypeValue2;
  }
  if (body.additionalTypeField3) {
    data["additionalType"][body.additionalTypeField3] =
      body.additionalTypeValue3;
  }

  if (body.alternateNameField1) {
    data["alternateName"] = {};
    data["alternateName"]["@type"] = "Text";
    data["alternateName"][body.alternateNameField1] = body.alternateNameValue1;
  }
  if (body.alternateNameField2) {
    data["alternateName"][body.alternateNameField2] = body.alternateNameValue2;
  }
  if (body.alternateNameField3) {
    data["alternateName"][body.alternateNameField3] = body.alternateNameValue3;
  }

  if (body.descriptionField1) {
    data["description"] = {};
    data["description"]["@type"] = "Text";
    data["description"][body.descriptionField1] = body.descriptionValue1;
  }
  if (body.descriptionField2) {
    data["description"][body.descriptionField2] = body.descriptionValue2;
  }
  if (body.descriptionField3) {
    data["description"][body.descriptionField3] = body.descriptionValue3;
  }

  if (body.disambiguatingDescriptionField1) {
    data["disambiguatingDescription"] = {};
    data["disambiguatingDescription"]["@type"] = "Text";
    data["disambiguatingDescription"][body.disambiguatingDescriptionField1] =
      body.disambiguatingDescriptionValue1;
  }
  if (body.disambiguatingDescriptionField2) {
    data["disambiguatingDescription"][body.disambiguatingDescriptionField2] =
      body.disambiguatingDescriptionValue2;
  }
  if (body.disambiguatingDescriptionField3) {
    data["disambiguatingDescription"][body.disambiguatingDescriptionField3] =
      body.disambiguatingDescriptionValue3;
  }

  if (body.identifierField1) {
    data["identifier"] = {};
    data["identifier"]["@type"] = "Text";
    data["identifier"][body.identifierField1] = body.identifierValue1;
  }
  if (body.identifierField2) {
    data["identifier"][body.identifierField2] = body.identifierValue2;
  }
  if (body.identifierField3) {
    data["identifier"][body.identifierField3] = body.identifierValue3;
  }

  if (body.imageField1) {
    data["image"] = {};
    data["image"]["@type"] = "ImageObject ";
    data["image"][body.imageField1] = body.imageValue1;
  }
  if (body.imageField2) {
    data["image"][body.imageField2] = body.imageValue2;
  }
  if (body.imageField3) {
    data["image"][body.imageField3] = body.imageValue3;
  }

  if (body.mainEntityOfPageField1) {
    data["mainEntityOfPage"] = {};
    data["mainEntityOfPage"]["@type"] = "CreativeWork ";
    data["mainEntityOfPage"][body.mainEntityOfPageField1] =
      body.mainEntityOfPageValue1;
  }
  if (body.mainEntityOfPageField2) {
    data["mainEntityOfPage"][body.mainEntityOfPageField2] =
      body.mainEntityOfPageValue2;
  }
  if (body.mainEntityOfPageField3) {
    data["mainEntityOfPage"][body.mainEntityOfPageField3] =
      body.mainEntityOfPageValue3;
  }

  if (body.nameField1) {
    data["name"] = {};
    data["name"]["@type"] = "Text";
    data["name"][body.nameField1] = body.nameValue1;
  }
  if (body.nameField2) {
    data["name"][body.nameField2] = body.nameValue2;
  }
  if (body.nameField3) {
    data["name"][body.nameField3] = body.nameValue3;
  }

  if (body.potentialActionField1) {
    data["potentialAction"] = {};
    data["potentialAction"]["@type"] = "Action";
    data["potentialAction"][body.potentialActionField1] =
      body.potentialActionValue1;
  }
  if (body.potentialActionField2) {
    data["potentialAction"][body.potentialActionField2] =
      body.potentialActionValue2;
  }
  if (body.potentialActionField3) {
    data["potentialAction"][body.potentialActionField3] =
      body.potentialActionValue3;
  }

  if (body.sameAsField1) {
    data["sameAs"] = {};
    data["sameAs"]["@type"] = "URL";
    data["sameAs"][body.sameAsField1] = body.sameAsValue1;
  }
  if (body.sameAsField2) {
    data["sameAs"][body.sameAsField2] = body.sameAsValue2;
  }
  if (body.sameAsField3) {
    data["sameAs"][body.sameAsField3] = body.sameAsValue3;
  }

  if (body.subjectOfField1) {
    data["subjectOf"] = {};
    data["subjectOf"]["@type"] = "CreativeWork";
    data["subjectOf"][body.subjectOfField1] = body.Value1;
  }
  if (body.subjectOfField2) {
    data["subjectOf"][body.subjectOfField2] = body.Value2;
  }
  if (body.subjectOfField3) {
    data["subjectOf"][body.subjectOfField3] = body.Value3;
  }

  if (body.urlField1) {
    data["url"] = {};
    data["url"]["@type"] = "URL";
    data["url"][body.urlField1] = body.urlValue1;
  }
  if (body.urlField2) {
    data["url"][body.urlField2] = body.urlValue2;
  }
  if (body.urlField3) {
    data["url"][body.urlField3] = body.urlValue3;
  }

  if (body.codeField1) {
    data["code"] = {};
    data["code"]["@type"] = "MedicalCode";
    data["code"][body.codeField1] = body.codeValue1;
  }
  if (body.codeField2) {
    data["code"][body.codeField2] = body.codeValue2;
  }
  if (body.codeField3) {
    data["code"][body.codeField3] = body.codeValue3;
  }

  if (body.guidelineField1) {
    data["guideline"] = {};
    data["guideline"]["@type"] = "MedicalGuideline";
    data["guideline"][body.guidelineField1] = body.guidelineValue1;
  }
  if (body.guidelineField2) {
    data["guideline"][body.guidelineField2] = body.guidelineValue2;
  }
  if (body.guidelineField3) {
    data["guideline"][body.guidelineField3] = body.guidelineValue3;
  }

  if (body.legalStatusField1) {
    data["legalStatus"] = {};
    data["legalStatus"]["@type"] = "MedicalEnumeration";
    data["legalStatus"][body.legalStatusField1] = body.legalStatusValue1;
  }
  if (body.legalStatusField2) {
    data["legalStatus"][body.legalStatusField2] = body.legalStatusValue2;
  }
  if (body.legalStatusField3) {
    data["legalStatus"][body.legalStatusField3] = body.legalStatusValue3;
  }

  if (body.medicineSystemField1) {
    data["medicineSystem"] = {};
    data["medicineSystem"]["@type"] = "MedicineSystem";
    data["medicineSystem"][body.medicineSystemField1] =
      body.medicineSystemValue1;
  }
  if (body.medicineSystemField2) {
    data["medicineSystem"][body.medicineSystemField2] =
      body.medicineSystemValue2;
  }
  if (body.medicineSystemField3) {
    data["medicineSystem"][body.medicineSystemField3] =
      body.medicineSystemValue3;
  }

  if (body.recognizingAuthorityField1) {
    data["recognizingAuthority"] = {};
    data["recognizingAuthority"]["@type"] = "Organization";
    data["recognizingAuthority"][body.recognizingAuthorityField1] =
      body.recognizingAuthorityValue1;
  }
  if (body.recognizingAuthorityField2) {
    data["recognizingAuthority"][body.recognizingAuthorityField2] =
      body.recognizingAuthorityValue2;
  }
  if (body.recognizingAuthorityField3) {
    data["recognizingAuthority"][body.recognizingAuthorityField3] =
      body.recognizingAuthorityValue3;
  }

  if (body.relevantSpecialtyField1) {
    data["relevantSpecialty"] = {};
    data["relevantSpecialty"]["@type"] = "MedicalSpecialty";
    data["relevantSpecialty"][body.relevantSpecialtyField1] =
      body.relevantSpecialtyValue1;
  }
  if (body.relevantSpecialtyField2) {
    data["relevantSpecialty"][body.relevantSpecialtyField2] =
      body.relevantSpecialtyValue2;
  }
  if (body.relevantSpecialtyField3) {
    data["relevantSpecialty"][body.relevantSpecialtyField3] =
      body.relevantSpecialtyValue3;
  }

  if (body.studyField1) {
    data["study"] = {};
    data["study"]["@type"] = "MedicalStudy";
    data["study"][body.studyField1] = body.studyValue1;
  }
  if (body.studyField2) {
    data["study"][body.studyField2] = body.studyValue2;
  }
  if (body.studyField3) {
    data["study"][body.studyField3] = body.studyValue3;
  }

  if (body.actionableFeedbackPolicyField1) {
    data["actionableFeedbackPolicy"] = {};
    data["actionableFeedbackPolicy"]["@type"] = "CreativeWork";
    data["actionableFeedbackPolicy"][body.actionableFeedbackPolicyField1] =
      body.actionableFeedbackPolicyValue1;
  }
  if (body.actionableFeedbackPolicyField2) {
    data["actionableFeedbackPolicy"][body.actionableFeedbackPolicyField2] =
      body.actionableFeedbackPolicyValue2;
  }
  if (body.actionableFeedbackPolicyField3) {
    data["actionableFeedbackPolicy"][body.actionableFeedbackPolicyField3] =
      body.actionableFeedbackPolicyValue3;
  }

  if (body.addressField1) {
    data["address"] = {};
    data["address"]["@type"] = "PostalAddress";
    data["address"][body.addressField1] = body.addressValue1;
  }
  if (body.addressField2) {
    data["address"][body.addressField2] = body.addressValue2;
  }
  if (body.addressField3) {
    data["address"][body.addressField3] = body.addressValue3;
  }

  if (body.alumniField1) {
    data["alumni"] = {};
    data["alumni"]["@type"] = "Person";
    data["alumni"][body.alumniField1] = body.alumniValue1;
  }
  if (body.alumniField2) {
    data["alumni"][body.alumniField2] = body.alumniValue2;
  }
  if (body.alumniField3) {
    data["alumni"][body.alumniField3] = body.alumniValue3;
  }

  if (body.areaServedField1) {
    data["areaServed"] = {};
    data["areaServed"]["@type"] = "Place";
    data["areaServed"][body.areaServedField1] = body.areaServedValue1;
  }
  if (body.areaServedField2) {
    data["areaServed"][body.areaServedField2] = body.areaServedValue2;
  }
  if (body.areaServedField3) {
    data["areaServed"][body.areaServedField3] = body.areaServedValue3;
  }

  if (body.brandField1) {
    data["brand"] = {};
    data["brand"]["@type"] = "Brand";
    data["brand"][body.brandField1] = body.brandValue1;
  }
  if (body.brandField2) {
    data["brand"][body.brandField2] = body.brandValue2;
  }
  if (body.brandField3) {
    data["brand"][body.brandField3] = body.brandValue3;
  }

  if (body.contactPointField1) {
    data["contactPoint"] = {};
    data["contactPoint"]["@type"] = "ContactPoint";
    data["contactPoint"][body.contactPointField1] = body.contactPointValue1;
  }
  if (body.contactPointField2) {
    data["contactPoint"][body.contactPointField2] = body.contactPointValue2;
  }
  if (body.contactPointField3) {
    data["contactPoint"][body.contactPointField3] = body.contactPointValue3;
  }

  if (body.correctionsPolicyField1) {
    data["correctionsPolicy"] = {};
    data["correctionsPolicy"]["@type"] = "CreativeWork";
    data["correctionsPolicy"][body.correctionsPolicyField1] =
      body.correctionsPolicyValue1;
  }
  if (body.correctionsPolicyField2) {
    data["correctionsPolicy"][body.correctionsPolicyField2] =
      body.correctionsPolicyValue2;
  }
  if (body.correctionsPolicyField3) {
    data["correctionsPolicy"][body.correctionsPolicyField3] =
      body.correctionsPolicyValue3;
  }

  if (body.departmentField1) {
    data["department"] = {};
    data["department"]["@type"] = "Organization";
    data["department"][body.departmentField1] = body.departmentValue1;
  }
  if (body.departmentField2) {
    data["department"][body.departmentField2] = body.departmentValue2;
  }
  if (body.departmentField3) {
    data["department"][body.departmentField3] = body.departmentValue3;
  }

  if (body.dissolutionDateField1) {
    data["dissolutionDate"] = {};
    data["dissolutionDate"]["@type"] = "Date";
    data["dissolutionDate"][body.dissolutionDateField1] =
      body.dissolutionDateValue1;
  }
  if (body.dissolutionDateField2) {
    data["dissolutionDate"][body.dissolutionDateField2] =
      body.dissolutionDateValue2;
  }
  if (body.dissolutionDateField3) {
    data["dissolutionDate"][body.dissolutionDateField3] =
      body.dissolutionDateValue3;
  }

  if (body.diversityPolicyField1) {
    data["diversityPolicy"] = {};
    data["diversityPolicy"]["@type"] = "CreativeWork";
    data["diversityPolicy"][body.diversityPolicyField1] =
      body.diversityPolicyValue1;
  }
  if (body.diversityPolicyField2) {
    data["diversityPolicy"][body.diversityPolicyField2] =
      body.diversityPolicyValue2;
  }
  if (body.diversityPolicyField3) {
    data["diversityPolicy"][body.diversityPolicyField3] =
      body.diversityPolicyValue3;
  }

  if (body.diversityStaffingReportField1) {
    data["diversityStaffingReport"] = {};
    data["diversityStaffingReport"]["@type"] = "Article";
    data["diversityStaffingReport"][body.diversityStaffingReportField1] =
      body.diversityStaffingReportValue1;
  }
  if (body.diversityStaffingReportField2) {
    data["diversityStaffingReport"][body.diversityStaffingReportField2] =
      body.diversityStaffingReportValue2;
  }
  if (body.diversityStaffingReportField3) {
    data["diversityStaffingReport"][body.diversityStaffingReportField3] =
      body.diversityStaffingReportValue3;
  }

  if (body.dunsField1) {
    data["duns"] = {};
    data["duns"]["@type"] = "Text";
    data["duns"][body.dunsField1] = body.dunsValue1;
  }
  if (body.dunsField2) {
    data["duns"][body.dunsField2] = body.dunsValue2;
  }
  if (body.dunsField3) {
    data["duns"][body.dunsField3] = body.dunsValue3;
  }

  if (body.emailField1) {
    data["email"] = {};
    data["email"]["@type"] = "Text";
    data["email"][body.emailField1] = body.emailValue1;
  }
  if (body.emailField2) {
    data["email"][body.emailField2] = body.emailValue2;
  }
  if (body.emailField3) {
    data["email"][body.emailField3] = body.emailValue3;
  }

  if (body.employeeField1) {
    data["employee"] = {};
    data["employee"]["@type"] = "Person";
    data["employee"][body.employeeField1] = body.employeeValue1;
  }
  if (body.employeeField2) {
    data["employee"][body.employeeField2] = body.employeeValue2;
  }
  if (body.employeeField3) {
    data["employee"][body.employeeField3] = body.employeeValue3;
  }

  if (body.ethicsPolicyField1) {
    data["ethicsPolicy"] = {};
    data["ethicsPolicy"]["@type"] = "CreativeWork";
    data["ethicsPolicy"][body.ethicsPolicyField1] = body.ethicsPolicyValue1;
  }
  if (body.ethicsPolicyField2) {
    data["ethicsPolicy"][body.ethicsPolicyField2] = body.ethicsPolicyValue2;
  }
  if (body.ethicsPolicyField3) {
    data["ethicsPolicy"][body.ethicsPolicyField3] = body.ethicsPolicyValue3;
  }

  if (body.eventField1) {
    data["event"] = {};
    data["event"]["@type"] = "Event";
    data["event"][body.eventField1] = body.eventValue1;
  }
  if (body.eventField2) {
    data["event"][body.eventField2] = body.eventValue2;
  }
  if (body.eventField3) {
    data["event"][body.eventField3] = body.eventValue3;
  }

  if (body.faxNumberField1) {
    data["faxNumber"] = {};
    data["faxNumber"]["@type"] = "Text";
    data["faxNumber"][body.faxNumberField1] = body.faxNumberValue1;
  }
  if (body.faxNumberField2) {
    data["faxNumber"][body.faxNumberField2] = body.faxNumberValue2;
  }
  if (body.faxNumberField3) {
    data["faxNumber"][body.faxNumberField3] = body.faxNumberValue3;
  }

  if (body.founderField1) {
    data["founder"] = {};
    data["founder"]["@type"] = "Person";
    data["founder"][body.founderField1] = body.founderValue1;
  }
  if (body.founderField2) {
    data["founder"][body.founderField2] = body.founderValue2;
  }
  if (body.founderField3) {
    data["founder"][body.founderField3] = body.founderValue3;
  }

  if (body.foundingDateField1) {
    data["foundingDate"] = {};
    data["foundingDate"]["@type"] = "Date";
    data["foundingDate"][body.foundingDateField1] = body.foundingDateValue1;
  }
  if (body.foundingDateField2) {
    data["foundingDate"][body.foundingDateField2] = body.foundingDateValue2;
  }
  if (body.foundingDateField3) {
    data["foundingDate"][body.foundingDateField3] = body.foundingDateValue3;
  }

  if (body.foundingLocationField1) {
    data["foundingLocation"] = {};
    data["foundingLocation"]["@type"] = "Place";
    data["foundingLocation"][body.foundingLocationField1] =
      body.foundingLocationValue1;
  }
  if (body.foundingLocationField2) {
    data["foundingLocation"][body.foundingLocationField2] =
      body.foundingLocationValue2;
  }
  if (body.foundingLocationField3) {
    data["foundingLocation"][body.foundingLocationField3] =
      body.foundingLocationValue3;
  }

  if (body.globalLocationNumberField1) {
    data["globalLocationNumber"] = {};
    data["globalLocationNumber"]["@type"] = "Text";
    data["globalLocationNumber"][body.globalLocationNumberField1] =
      body.globalLocationNumberValue1;
  }
  if (body.globalLocationNumberField2) {
    data["globalLocationNumber"][body.globalLocationNumberField2] =
      body.globalLocationNumberValue2;
  }
  if (body.globalLocationNumberField3) {
    data["globalLocationNumber"][body.globalLocationNumberField3] =
      body.globalLocationNumberValue3;
  }

  if (body.hasCredentialField1) {
    data["hasCredential"] = {};
    data["hasCredential"]["@type"] = "EducationalOccupationalCredential";
    data["hasCredential"][body.hasCredentialField1] = body.hasCredentialValue1;
  }
  if (body.hasCredentialField2) {
    data["hasCredential"][body.hasCredentialField2] = body.hasCredentialValue2;
  }
  if (body.hasCredentialField3) {
    data["hasCredential"][body.hasCredentialField3] = body.hasCredentialValue3;
  }

  if (body.hasMerchantReturnPolicyField1) {
    data["hasMerchantReturnPolicy"] = {};
    data["hasMerchantReturnPolicy"]["@type"] = "MerchantReturnPolicy";
    data["hasMerchantReturnPolicy"][body.hasMerchantReturnPolicyField1] =
      body.hasMerchantReturnPolicyValue1;
  }
  if (body.hasMerchantReturnPolicyField2) {
    data["hasMerchantReturnPolicy"][body.hasMerchantReturnPolicyField2] =
      body.hasMerchantReturnPolicyValue2;
  }
  if (body.hasMerchantReturnPolicyField3) {
    data["hasMerchantReturnPolicy"][body.hasMerchantReturnPolicyField3] =
      body.hasMerchantReturnPolicyValue3;
  }

  if (body.hasOfferCatalogField1) {
    data["hasOfferCatalog"] = {};
    data["hasOfferCatalog"]["@type"] = "OfferCatalog";
    data["hasOfferCatalog"][body.hasOfferCatalogField1] =
      body.hasOfferCatalogValue1;
  }
  if (body.hasOfferCatalogField2) {
    data["hasOfferCatalog"][body.hasOfferCatalogField2] =
      body.hasOfferCatalogValue2;
  }
  if (body.hasOfferCatalogField3) {
    data["hasOfferCatalog"][body.hasOfferCatalogField3] =
      body.hasOfferCatalogValue3;
  }

  if (body.hasPOSField1) {
    data["hasPOS"] = {};
    data["hasPOS"]["@type"] = "Place";
    data["hasPOS"][body.hasPOSField1] = body.hasPOSValue1;
  }
  if (body.hasPOSField2) {
    data["hasPOS"][body.hasPOSField2] = body.hasPOSValue2;
  }
  if (body.hasPOSField3) {
    data["hasPOS"][body.hasPOSField3] = body.hasPOSValue3;
  }

  if (body.interactionStatisticField1) {
    data["interactionStatistic"] = {};
    data["interactionStatistic"]["@type"] = "InteractionCounter";
    data["interactionStatistic"][body.interactionStatisticField1] =
      body.interactionStatisticValue1;
  }
  if (body.interactionStatisticField2) {
    data["interactionStatistic"][body.interactionStatisticField2] =
      body.interactionStatisticValue2;
  }
  if (body.interactionStatisticField3) {
    data["interactionStatistic"][body.interactionStatisticField3] =
      body.interactionStatisticValue3;
  }

  if (body.isicV4Field1) {
    data["isicV4"] = {};
    data["isicV4"]["@type"] = "___";
    data["isicV4"][body.isicV4Field1] = body.isicV4Value1;
  }
  if (body.isicV4Field2) {
    data["isicV4"][body.isicV4Field2] = body.isicV4Value2;
  }
  if (body.isicV4Field3) {
    data["isicV4"][body.isicV4Field3] = body.isicV4Value3;
  }

  if (body.iso6523CodeField1) {
    data["iso6523Code"] = {};
    data["iso6523Code"]["@type"] = "Text";
    data["iso6523Code"][body.iso6523CodeField1] = body.iso6523CodeValue1;
  }
  if (body.iso6523CodeField2) {
    data["iso6523Code"][body.iso6523CodeField2] = body.iso6523CodeValue2;
  }
  if (body.iso6523CodeField3) {
    data["iso6523Code"][body.iso6523CodeField3] = body.iso6523CodeValue3;
  }

  if (body.knowsAboutField1) {
    data["knowsAbout"] = {};
    data["knowsAbout"]["@type"] = "Thing";
    data["knowsAbout"][body.knowsAboutField1] = body.knowsAboutValue1;
  }
  if (body.knowsAboutField2) {
    data["knowsAbout"][body.knowsAboutField2] = body.knowsAboutValue2;
  }
  if (body.knowsAboutField3) {
    data["knowsAbout"][body.knowsAboutField3] = body.knowsAboutValue3;
  }

  if (body.knowsLanguageField1) {
    data["knowsLanguage"] = {};
    data["knowsLanguage"]["@type"] = "Language";
    data["knowsLanguage"][body.knowsLanguageField1] = body.knowsLanguageValue1;
  }
  if (body.knowsLanguageField2) {
    data["knowsLanguage"][body.knowsLanguageField2] = body.knowsLanguageValue2;
  }
  if (body.knowsLanguageField3) {
    data["knowsLanguage"][body.knowsLanguageField3] = body.knowsLanguageValue3;
  }

  if (body.legalNameField1) {
    data["legalName"] = {};
    data["legalName"]["@type"] = "Text";
    data["legalName"][body.legalNameField1] = body.legalNameValue1;
  }
  if (body.legalNameField2) {
    data["legalName"][body.legalNameField2] = body.legalNameValue2;
  }
  if (body.legalNameField3) {
    data["legalName"][body.legalNameField3] = body.legalNameValue3;
  }

  if (body.leiCodeField1) {
    data["leiCode"] = {};
    data["leiCode"]["@type"] = "Text";
    data["leiCode"][body.leiCodeField1] = body.leiCodeValue1;
  }
  if (body.leiCodeField2) {
    data["leiCode"][body.leiCodeField2] = body.leiCodeValue2;
  }
  if (body.leiCodeField3) {
    data["leiCode"][body.leiCodeField3] = body.leiCodeValue3;
  }

  if (body.logoField1) {
    data["logo"] = {};
    data["logo"]["@type"] = "ImageObject";
    data["logo"][body.logoField1] = body.logoValue1;
  }
  if (body.logoField2) {
    data["logo"][body.logoField2] = body.logoValue2;
  }
  if (body.logoField3) {
    data["logo"][body.logoField3] = body.logoValue3;
  }

  if (body.makesOfferField1) {
    data["makesOffer"] = {};
    data["makesOffer"]["@type"] = "Offer";
    data["makesOffer"][body.makesOfferField1] = body.makesOfferValue1;
  }
  if (body.makesOfferField2) {
    data["makesOffer"][body.makesOfferField2] = body.makesOfferValue2;
  }
  if (body.makesOfferField3) {
    data["makesOffer"][body.makesOfferField3] = body.makesOfferValue3;
  }

  if (body.memberField1) {
    data["member"] = {};
    data["member"]["@type"] = "Person";
    data["member"][body.memberField1] = body.memberValue1;
  }
  if (body.memberField2) {
    data["member"][body.memberField2] = body.memberValue2;
  }
  if (body.memberField3) {
    data["member"][body.memberField3] = body.memberValue3;
  }

  if (body.memberOfField1) {
    data["memberOf"] = {};
    data["memberOf"]["@type"] = "Organization";
    data["memberOf"][body.memberOfField1] = body.memberOfValue1;
  }
  if (body.memberOfField2) {
    data["memberOf"][body.memberOfField2] = body.memberOfValue2;
  }
  if (body.memberOfField3) {
    data["memberOf"][body.memberOfField3] = body.memberOfValue3;
  }

  if (body.naicsField1) {
    data["naics"] = {};
    data["naics"]["@type"] = "Text";
    data["naics"][body.naicsField1] = body.naicsValue1;
  }
  if (body.naicsField2) {
    data["naics"][body.naicsField2] = body.naicsValue2;
  }
  if (body.naicsField3) {
    data["naics"][body.naicsField3] = body.naicsValue3;
  }

  if (body.nonprofitStatusField1) {
    data["nonprofitStatus"] = {};
    data["nonprofitStatus"]["@type"] = "NonprofitType";
    data["nonprofitStatus"][body.nonprofitStatusField1] =
      body.nonprofitStatusValue1;
  }
  if (body.nonprofitStatusField2) {
    data["nonprofitStatus"][body.nonprofitStatusField2] =
      body.nonprofitStatusValue2;
  }
  if (body.nonprofitStatusField3) {
    data["nonprofitStatus"][body.nonprofitStatusField3] =
      body.nonprofitStatusValue3;
  }

  if (body.numberOfEmployeesField1) {
    data["numberOfEmployees"] = {};
    data["numberOfEmployees"]["@type"] = "QuantitativeValue";
    data["numberOfEmployees"][body.numberOfEmployeesField1] =
      body.numberOfEmployeesValue1;
  }
  if (body.numberOfEmployeesField2) {
    data["numberOfEmployees"][body.numberOfEmployeesField2] =
      body.numberOfEmployeesValue2;
  }
  if (body.numberOfEmployeesField3) {
    data["numberOfEmployees"][body.numberOfEmployeesField3] =
      body.numberOfEmployeesValue3;
  }

  if (body.ownershipFundingInfoField1) {
    data["ownershipFundingInfo"] = {};
    data["ownershipFundingInfo"]["@type"] = "Text";
    data["ownershipFundingInfo"][body.ownershipFundingInfoField1] =
      body.ownershipFundingInfoValue1;
  }
  if (body.ownershipFundingInfoField2) {
    data["ownershipFundingInfo"][body.ownershipFundingInfoField2] =
      body.ownershipFundingInfoValue2;
  }
  if (body.ownershipFundingInfoField3) {
    data["ownershipFundingInfo"][body.ownershipFundingInfoField3] =
      body.ownershipFundingInfoValue3;
  }

  if (body.ownsField1) {
    data["owns"] = {};
    data["owns"]["@type"] = "Product";
    data["owns"][body.ownsField1] = body.ownsValue1;
  }
  if (body.ownsField2) {
    data["owns"][body.ownsField2] = body.ownsValue2;
  }
  if (body.ownsField3) {
    data["owns"][body.ownsField3] = body.ownsValue3;
  }

  if (body.parentOrganizationField1) {
    data["parentOrganization"] = {};
    data["parentOrganization"]["@type"] = "Organization";
    data["parentOrganization"][body.parentOrganizationField1] =
      body.parentOrganizationValue1;
  }
  if (body.parentOrganizationField2) {
    data["parentOrganization"][body.parentOrganizationField2] =
      body.parentOrganizationValue2;
  }
  if (body.parentOrganizationField3) {
    data["parentOrganization"][body.parentOrganizationField3] =
      body.parentOrganizationValue3;
  }

  if (body.seeksField1) {
    data["seeks"] = {};
    data["seeks"]["@type"] = "Demand";
    data["seeks"][body.seeksField1] = body.seeksValue1;
  }
  if (body.seeksField2) {
    data["seeks"][body.seeksField2] = body.seeksValue2;
  }
  if (body.seeksField3) {
    data["seeks"][body.seeksField3] = body.seeksValue3;
  }

  if (body.sloganField1) {
    data["slogan"] = {};
    data["slogan"]["@type"] = "Text";
    data["slogan"][body.sloganField1] = body.sloganValue1;
  }
  if (body.sloganField2) {
    data["slogan"][body.sloganField2] = body.sloganValue2;
  }
  if (body.sloganField3) {
    data["slogan"][body.sloganField3] = body.sloganValue3;
  }

  if (body.subOrganizationField1) {
    data["subOrganization"] = {};
    data["subOrganization"]["@type"] = "Organization";
    data["subOrganization"][body.subOrganizationField1] =
      body.subOrganizationValue1;
  }
  if (body.subOrganizationField2) {
    data["subOrganization"][body.subOrganizationField2] =
      body.subOrganizationValue2;
  }
  if (body.subOrganizationField3) {
    data["subOrganization"][body.subOrganizationField3] =
      body.subOrganizationValue3;
  }

  if (body.taxIDField1) {
    data["taxID"] = {};
    data["taxID"]["@type"] = "Text";
    data["taxID"][body.taxIDField1] = body.taxIDValue1;
  }
  if (body.taxIDField2) {
    data["taxID"][body.taxIDField2] = body.taxIDValue2;
  }
  if (body.taxIDField3) {
    data["taxID"][body.taxIDField3] = body.taxIDValue3;
  }

  if (body.telephoneField1) {
    data["telephone"] = {};
    data["telephone"]["@type"] = "Text";
    data["telephone"][body.telephoneField1] = body.telephoneValue1;
  }
  if (body.telephoneField2) {
    data["telephone"][body.telephoneField2] = body.telephoneValue2;
  }
  if (body.telephoneField3) {
    data["telephone"][body.telephoneField3] = body.telephoneValue3;
  }

  if (body.unnamedSourcesPolicyField1) {
    data["unnamedSourcesPolicy"] = {};
    data["unnamedSourcesPolicy"]["@type"] = "CreativeWork";
    data["unnamedSourcesPolicy"][body.unnamedSourcesPolicyField1] =
      body.unnamedSourcesPolicyValue1;
  }
  if (body.unnamedSourcesPolicyField2) {
    data["unnamedSourcesPolicy"][body.unnamedSourcesPolicyField2] =
      body.unnamedSourcesPolicyValue2;
  }
  if (body.unnamedSourcesPolicyField3) {
    data["unnamedSourcesPolicy"][body.unnamedSourcesPolicyField3] =
      body.unnamedSourcesPolicyValue3;
  }

  if (body.vatIDField1) {
    data["vatID"] = {};
    data["vatID"]["@type"] = "Text";
    data["vatID"][body.vatIDField1] = body.vatIDValue1;
  }
  if (body.vatIDField2) {
    data["vatID"][body.vatIDField2] = body.vatIDValue2;
  }
  if (body.vatIDField3) {
    data["vatID"][body.vatIDField3] = body.vatIDValue3;
  }

  if (body.additionalNameField1) {
    data["additionalName"] = {};
    data["additionalName"]["@type"] = "Text";
    data["additionalName"][body.additionalNameField1] =
      body.additionalNameValue1;
  }
  if (body.additionalNameField2) {
    data["additionalName"][body.additionalNameField2] =
      body.additionalNameValue2;
  }
  if (body.additionalNameField3) {
    data["additionalName"][body.additionalNameField3] =
      body.additionalNameValue3;
  }

  if (body.affiliationField1) {
    data["affiliation"] = {};
    data["affiliation"]["@type"] = "Organization";
    data["affiliation"][body.affiliationField1] = body.affiliationValue1;
  }
  if (body.affiliationField2) {
    data["affiliation"][body.affiliationField2] = body.affiliationValue2;
  }
  if (body.affiliationField3) {
    data["affiliation"][body.affiliationField3] = body.affiliationValue3;
  }

  if (body.alumniOfField1) {
    data["alumniOf"] = {};
    data["alumniOf"]["@type"] = "Organization";
    data["alumniOf"][body.alumniOfField1] = body.alumniOfValue1;
  }
  if (body.alumniOfField2) {
    data["alumniOf"][body.alumniOfField2] = body.alumniOfValue2;
  }
  if (body.alumniOfField3) {
    data["alumniOf"][body.alumniOfField3] = body.alumniOfValue3;
  }

  if (body.birthDateField1) {
    data["birthDate"] = {};
    data["birthDate"]["@type"] = "Date";
    data["birthDate"][body.birthDateField1] = body.birthDateValue1;
  }
  if (body.birthDateField2) {
    data["birthDate"][body.birthDateField2] = body.birthDateValue2;
  }
  if (body.birthDateField3) {
    data["birthDate"][body.birthDateField3] = body.birthDateValue3;
  }

  if (body.birthPlaceField1) {
    data["birthPlace"] = {};
    data["birthPlace"]["@type"] = "Place";
    data["birthPlace"][body.birthPlaceField1] = body.birthPlaceValue1;
  }
  if (body.birthPlaceField2) {
    data["birthPlace"][body.birthPlaceField2] = body.birthPlaceValue2;
  }
  if (body.birthPlaceField3) {
    data["birthPlace"][body.birthPlaceField3] = body.birthPlaceValue3;
  }

  if (body.callSignField1) {
    data["callSign"] = {};
    data["callSign"]["@type"] = "Text";
    data["callSign"][body.callSignField1] = body.callSignValue1;
  }
  if (body.callSignField2) {
    data["callSign"][body.callSignField2] = body.callSignValue2;
  }
  if (body.callSignField3) {
    data["callSign"][body.callSignField3] = body.callSignValue3;
  }

  if (body.childrenField1) {
    data["children"] = {};
    data["children"]["@type"] = "Person";
    data["children"][body.childrenField1] = body.childrenValue1;
  }
  if (body.childrenField2) {
    data["children"][body.childrenField2] = body.childrenValue2;
  }
  if (body.childrenField3) {
    data["children"][body.childrenField3] = body.childrenValue3;
  }

  if (body.colleagueField1) {
    data["colleague"] = {};
    data["colleague"]["@type"] = "Person";
    data["colleague"][body.colleagueField1] = body.colleagueValue1;
  }
  if (body.colleagueField2) {
    data["colleague"][body.colleagueField2] = body.colleagueValue2;
  }
  if (body.colleagueField3) {
    data["colleague"][body.colleagueField3] = body.colleagueValue3;
  }

  if (body.deathDateField1) {
    data["deathDate"] = {};
    data["deathDate"]["@type"] = "Date";
    data["deathDate"][body.deathDateField1] = body.deathDateValue1;
  }
  if (body.deathDateField2) {
    data["deathDate"][body.deathDateField2] = body.deathDateValue2;
  }
  if (body.deathDateField3) {
    data["deathDate"][body.deathDateField3] = body.deathDateValue3;
  }

  if (body.deathPlaceField1) {
    data["deathPlace"] = {};
    data["deathPlace"]["@type"] = "Place";
    data["deathPlace"][body.deathPlaceField1] = body.deathPlaceValue1;
  }
  if (body.deathPlaceField2) {
    data["deathPlace"][body.deathPlaceField2] = body.deathPlaceValue2;
  }
  if (body.deathPlaceField3) {
    data["deathPlace"][body.deathPlaceField3] = body.deathPlaceValue3;
  }

  if (body.familyNameField1) {
    data["familyName"] = {};
    data["familyName"]["@type"] = "Text";
    data["familyName"][body.familyNameField1] = body.familyNameValue1;
  }
  if (body.familyNameField2) {
    data["familyName"][body.familyNameField2] = body.familyNameValue2;
  }
  if (body.familyNameField3) {
    data["familyName"][body.familyNameField3] = body.familyNameValue3;
  }

  if (body.followsField1) {
    data["follows"] = {};
    data["follows"]["@type"] = "Person";
    data["follows"][body.followsField1] = body.followsValue1;
  }
  if (body.followsField2) {
    data["follows"][body.followsField2] = body.followsValue2;
  }
  if (body.followsField3) {
    data["follows"][body.followsField3] = bodyfollowsValue3;
  }

  if (body.genderField1) {
    data["gender"] = {};
    data["gender"]["@type"] = "GenderType";
    data["gender"][body.genderField1] = body.genderValue1;
  }
  if (body.genderField2) {
    data["gender"][body.genderField2] = body.genderValue2;
  }
  if (body.genderField3) {
    data["gender"][body.genderField3] = body.genderValue3;
  }

  if (body.givenNameField1) {
    data["givenName"] = {};
    data["givenName"]["@type"] = "Text";
    data["givenName"][body.givenNameField1] = body.givenNameValue1;
  }
  if (body.givenNameField2) {
    data["givenName"][body.givenNameField2] = body.givenNameValue2;
  }
  if (body.givenNameField3) {
    data["givenName"][body.givenNameField3] = body.givenNameValue3;
  }

  if (body.hasOccupationField1) {
    data["hasOccupation"] = {};
    data["hasOccupation"]["@type"] = "Occupation";
    data["hasOccupation"][body.hasOccupationField1] = body.hasOccupationValue1;
  }
  if (body.hasOccupationField2) {
    data["hasOccupation"][body.hasOccupationField2] = body.hasOccupationValue2;
  }
  if (body.hasOccupationField3) {
    data["hasOccupation"][body.hasOccupationField3] = body.hasOccupationValue3;
  }

  if (body.hasOfferCatalogField1) {
    data["hasOfferCatalog"] = {};
    data["hasOfferCatalog"]["@type"] = "OfferCatalog";
    data["hasOfferCatalog"][body.hasOfferCatalogField1] =
      body.hasOfferCatalogValue1;
  }
  if (body.hasOfferCatalogField2) {
    data["hasOfferCatalog"][body.hasOfferCatalogField2] =
      body.hasOfferCatalogValue2;
  }
  if (body.hasOfferCatalogField3) {
    data["hasOfferCatalog"][body.hasOfferCatalogField3] =
      body.hasOfferCatalogValue3;
  }

  if (body.heightField1) {
    data["height"] = {};
    data["height"]["@type"] = "Distance";
    data["height"][body.heightField1] = body.heightValue1;
  }
  if (body.heightField2) {
    data["height"][body.heightField2] = body.heightValue2;
  }
  if (body.heightField3) {
    data["height"][body.heightField3] = body.heightValue3;
  }

  if (body.homeLocationField1) {
    data["homeLocation"] = {};
    data["homeLocation"]["@type"] = "Place";
    data["homeLocation"][body.homeLocationField1] = body.homeLocationValue1;
  }
  if (body.homeLocationField2) {
    data["homeLocation"][body.homeLocationField2] = body.homeLocationValue2;
  }
  if (body.homeLocationField3) {
    data["homeLocation"][body.homeLocationField3] = body.homeLocationValue3;
  }

  if (body.honorificPrefixField1) {
    data["honorificPrefix"] = {};
    data["honorificPrefix"]["@type"] = "Text";
    data["honorificPrefix"][body.honorificPrefixField1] =
      body.honorificPrefixValue1;
  }
  if (body.honorificPrefixField2) {
    data["honorificPrefix"][body.honorificPrefixField2] =
      body.honorificPrefixValue2;
  }
  if (body.honorificPrefixField3) {
    data["honorificPrefix"][body.honorificPrefixField3] =
      body.honorificPrefixValue3;
  }

  if (body.honorificSuffixField1) {
    data["honorificSuffix"] = {};
    data["honorificSuffix"]["@type"] = "Text";
    data["honorificSuffix"][body.honorificSuffixField1] =
      body.honorificSuffixValue1;
  }
  if (body.honorificSuffixField2) {
    data["honorificSuffix"][body.honorificSuffixField2] =
      body.honorificSuffixValue2;
  }
  if (body.honorificSuffixField3) {
    data["honorificSuffix"][body.honorificSuffixField3] =
      body.honorificSuffixValue3;
  }

  if (body.jobTitleField1) {
    data["jobTitle"] = {};
    data["jobTitle"]["@type"] = "Text";
    data["jobTitle"][body.jobTitleField1] = body.jobTitleValue1;
  }
  if (body.jobTitleField2) {
    data["jobTitle"][body.jobTitleField2] = body.jobTitleValue2;
  }
  if (body.jobTitleField3) {
    data["jobTitle"][body.jobTitleField3] = body.jobTitleValue3;
  }

  if (body.knowsField1) {
    data["knows"] = {};
    data["knows"]["@type"] = "Person";
    data["knows"][body.knowsField1] = body.knowsValue1;
  }
  if (body.knowsField2) {
    data["knows"][body.knowsField2] = body.knowsValue2;
  }
  if (body.knowsField3) {
    data["knows"][body.knowsField3] = body.knowsValue3;
  }

  if (body.nationalityField1) {
    data["nationality"] = {};
    data["nationality"]["@type"] = "Country";
    data["nationality"][body.nationalityField1] = body.nationalityValue1;
  }
  if (body.nationalityField2) {
    data["nationality"][body.nationalityField2] = body.nationalityValue2;
  }
  if (body.nationalityField3) {
    data["nationality"][body.nationalityField3] = body.nationalityValue3;
  }

  if (body.netWorthField1) {
    data["netWorth"] = {};
    data["netWorth"]["@type"] = "MonetaryAmount";
    data["netWorth"][body.netWorthField1] = body.netWorthValue1;
  }
  if (body.netWorthField2) {
    data["netWorth"][body.netWorthField2] = body.netWorthValue2;
  }
  if (body.netWorthField3) {
    data["netWorth"][body.netWorthField3] = body.netWorthValue3;
  }

  if (body.parentField1) {
    data["parent"] = {};
    data["parent"]["@type"] = "Person";
    data["parent"][body.parentField1] = body.parentValue1;
  }
  if (body.parentField2) {
    data["parent"][body.parentField2] = body.parentValue2;
  }
  if (body.parentField3) {
    data["parent"][body.parentField3] = body.parentValue3;
  }

  if (body.performerInField1) {
    data["performerIn"] = {};
    data["performerIn"]["@type"] = "Event";
    data["performerIn"][body.performerInField1] = body.performerInValue1;
  }
  if (body.performerInField2) {
    data["performerIn"][body.performerInField2] = body.performerInValue2;
  }
  if (body.performerInField3) {
    data["performerIn"][body.performerInField3] = body.performerInValue3;
  }

  if (body.relatedToField1) {
    data["relatedTo"] = {};
    data["relatedTo"]["@type"] = "Person";
    data["relatedTo"][body.relatedToField1] = body.relatedToValue1;
  }
  if (body.relatedToField2) {
    data["relatedTo"][body.relatedToField2] = body.relatedToValue2;
  }
  if (body.relatedToField3) {
    data["relatedTo"][body.relatedToField3] = body.relatedToValue3;
  }

  if (body.siblingField1) {
    data["sibling"] = {};
    data["sibling"]["@type"] = "Person";
    data["sibling"][body.siblingField1] = body.siblingValue1;
  }
  if (body.siblingField2) {
    data["sibling"][body.siblingField2] = body.siblingValue2;
  }
  if (body.siblingField3) {
    data["sibling"][body.siblingField3] = body.siblingValue3;
  }

  if (body.spouseField1) {
    data["spouse"] = {};
    data["spouse"]["@type"] = "Person";
    data["spouse"][body.spouseField1] = body.spouseValue1;
  }
  if (body.spouseField2) {
    data["spouse"][body.spouse] = body.spouseValue2;
  }
  if (body.spouseField3) {
    data["spouse"][body.spouseField3] = body.spouseValue3;
  }

  if (body.weightField1) {
    data["weight"] = {};
    data["weight"]["@type"] = "QuantitativeValue";
    data["weight"][body.weightField1] = body.weightValue1;
  }
  if (body.weightField2) {
    data["weight"][body.weightField2] = body.weightValue2;
  }
  if (body.weightField3) {
    data["weight"][body.weightField3] = body.weightValue3;
  }

  if (body.workLocationField1) {
    data["workLocation"] = {};
    data["workLocation"]["@type"] = "Place";
    data["workLocation"][body.workLocationField1] = body.workLocationValue1;
  }
  if (body.workLocationField2) {
    data["workLocation"][body.workLocationField2] = body.workLocationValue2;
  }
  if (body.workLocationField3) {
    data["workLocation"][body.workLocationField3] = body.workLocationValue3;
  }

  if (body.worksForField1) {
    data["worksFor"] = {};
    data["worksFor"]["@type"] = "Organization";
    data["worksFor"][body.worksForField1] = body.worksForValue1;
  }
  if (body.worksForField2) {
    data["worksFor"][body.worksForField2] = body.worksForValue2;
  }
  if (body.worksForField3) {
    data["worksFor"][body.worksForField3] = body.worksForValue3;
  }

  if (body.additionalPropertyField1) {
    data["additionalProperty"] = {};
    data["additionalProperty"]["@type"] = "PropertyValue";
    data["additionalProperty"][body.additionalPropertyField1] =
      body.additionalPropertyValue1;
  }
  if (body.additionalPropertyField2) {
    data["additionalProperty"][body.additionalPropertyField2] =
      body.additionalPropertyValue2;
  }
  if (body.additionalPropertyField3) {
    data["additionalProperty"][body.additionalPropertyField3] =
      body.additionalPropertyValue3;
  }

  if (body.amenityFeatureField1) {
    data["amenityFeature"] = {};
    data["amenityFeature"]["@type"] = "LocationFeatureSpecification";
    data["amenityFeature"][body.amenityFeatureField1] =
      body.amenityFeatureValue1;
  }
  if (body.amenityFeatureField2) {
    data["amenityFeature"][body.amenityFeatureField2] =
      body.amenityFeatureValue2;
  }
  if (body.amenityFeatureField3) {
    data["amenityFeature"][body.amenityFeatureField3] =
      body.amenityFeatureValue3;
  }

  if (body.branchCodeField1) {
    data["branchCode"] = {};
    data["branchCode"]["@type"] = "Text";
    data["branchCode"][body.branchCodeField1] = body.branchCodeValue1;
  }
  if (body.branchCodeField2) {
    data["branchCode"][body.branchCodeField2] = body.branchCodeValue2;
  }
  if (body.branchCodeField3) {
    data["branchCode"][body.branchCodeField3] = body.branchCodeValue3;
  }

  if (body.containedInPlaceField1) {
    data["containedInPlace"] = {};
    data["containedInPlace"]["@type"] = "Place";
    data["containedInPlace"][body.containedInPlaceField1] =
      body.containedInPlaceValue1;
  }
  if (body.containedInPlaceField2) {
    data["containedInPlace"][body.containedInPlaceField2] =
      body.containedInPlaceValue2;
  }
  if (body.containedInPlaceField3) {
    data["containedInPlace"][body.containedInPlaceField3] =
      body.containedInPlaceValue3;
  }

  if (body.containsPlaceField1) {
    data["containsPlace"] = {};
    data["containsPlace"]["@type"] = "Place";
    data["containsPlace"][body.containsPlaceField1] = body.containsPlaceValue1;
  }
  if (body.containsPlaceField2) {
    data["containsPlace"][body.containsPlaceField2] = body.containsPlaceValue2;
  }
  if (body.containsPlaceField3) {
    data["containsPlace"][body.containsPlaceField3] = body.containsPlaceValue3;
  }

  if (body.geoField1) {
    data["geo"] = {};
    data["geo"]["@type"] = "GeoCoordinates";
    data["geo"][body.geoField1] = body.geoValue1;
  }
  if (body.geoField2) {
    data["geo"][body.geoField2] = body.geoValue2;
  }
  if (body.geoField3) {
    data["geo"][body.geoField3] = body.geoValue3;
  }

  if (body.geoContainsField1) {
    data["geoContains"] = {};
    data["geoContains"]["@type"] = "GeospatialGeometry";
    data["geoContains"][body.geoContainsField1] = body.geoContainsValue1;
  }
  if (body.geoContainsField2) {
    data["geoContains"][body.geoContainsField2] = body.geoContainsValue2;
  }
  if (body.geoContainsField3) {
    data["geoContains"][body.geoContainsField3] = body.geoContainsValue3;
  }

  if (body.geoCoveredByField1) {
    data["geoCoveredBy"] = {};
    data["geoCoveredBy"]["@type"] = "GeospatialGeometry";
    data["geoCoveredBy"][body.geoCoveredByField1] = body.geoCoveredByValue1;
  }
  if (body.geoCoveredByField2) {
    data["geoCoveredBy"][body.geoCoveredByField2] = body.geoCoveredByValue2;
  }
  if (body.geoCoveredByField3) {
    data["geoCoveredBy"][body.geoCoveredByField3] = body.geoCoveredByValue3;
  }

  if (body.geoCoversField1) {
    data["geoCovers"] = {};
    data["geoCovers"]["@type"] = "GeospatialGeometry";
    data["geoCovers"][body.geoCoversField1] = body.geoCoversValue1;
  }
  if (body.geoCoversField2) {
    data["geoCovers"][body.geoCoversField2] = body.geoCoversValue2;
  }
  if (body.geoCoversField3) {
    data["geoCovers"][body.geoCoversField3] = body.geoCoversValue3;
  }

  if (body.geoCrossesField1) {
    data["geoCrosses"] = {};
    data["geoCrosses"]["@type"] = "GeospatialGeometry";
    data["geoCrosses"][body.geoCrossesField1] = body.geoCrossesValue1;
  }
  if (body.geoCrossesField2) {
    data["geoCrosses"][body.geoCrossesField2] = body.geoCrossesValue2;
  }
  if (body.geoCrossesField3) {
    data["geoCrosses"][body.geoCrossesField3] = body.geoCrossesValue3;
  }

  if (body.geoDisjointField1) {
    data["geoDisjoint"] = {};
    data["geoDisjoint"]["@type"] = "GeospatialGeometry";
    data["geoDisjoint"][body.geoDisjointField1] = body.geoDisjointValue1;
  }
  if (body.geoDisjointField2) {
    data["geoDisjoint"][body.geoDisjointField2] = body.geoDisjointValue2;
  }
  if (body.geoDisjointField3) {
    data["geoDisjoint"][body.geoDisjointField3] = body.geoDisjointValue3;
  }

  if (body.geoEqualsField1) {
    data["geoEquals"] = {};
    data["geoEquals"]["@type"] = "GeospatialGeometry";
    data["geoEquals"][body.geoEqualsField1] = body.geoEqualsValue1;
  }
  if (body.geoEqualsField2) {
    data["geoEquals"][body.geoEqualsField2] = body.geoEqualsValue2;
  }
  if (body.geoEqualsField3) {
    data["geoEquals"][body.geoEqualsField3] = body.geoEqualsValue3;
  }

  if (body.geoIntersectsField1) {
    data["geoIntersects"] = {};
    data["geoIntersects"]["@type"] = "GeospatialGeometry";
    data["geoIntersects"][body.geoIntersectsField1] = body.geoIntersectsValue1;
  }
  if (body.geoIntersectsField2) {
    data["geoIntersects"][body.geoIntersectsField2] = body.geoIntersectsValue2;
  }
  if (body.geoIntersectsField3) {
    data["geoIntersects"][body.geoIntersectsField3] = body.geoIntersectsValue3;
  }

  if (body.geoOverlapsField1) {
    data["geoOverlaps"] = {};
    data["geoOverlaps"]["@type"] = "GeospatialGeometry";
    data["geoOverlaps"][body.geoOverlapsField1] = body.geoOverlapsValue1;
  }
  if (body.geoOverlapsField2) {
    data["geoOverlaps"][body.geoOverlapsField2] = body.geoOverlapsValue2;
  }
  if (body.geoOverlapsField3) {
    data["geoOverlaps"][body.geoOverlapsField3] = body.geoOverlapsValue3;
  }

  if (body.geoTouchesField1) {
    data["geoTouches"] = {};
    data["geoTouches"]["@type"] = "GeospatialGeometry";
    data["geoTouches"][body.geoTouchesField1] = body.geoTouchesValue1;
  }
  if (body.geoTouchesField2) {
    data["geoTouches"][body.geoTouchesField2] = body.geoTouchesValue2;
  }
  if (body.geoTouchesField3) {
    data["geoTouches"][body.geoTouchesField3] = body.geoTouchesValue3;
  }

  if (body.geoWithinField1) {
    data["geoWithin"] = {};
    data["geoWithin"]["@type"] = "GeospatialGeometry";
    data["geoWithin"][body.geoWithinField1] = body.geoWithinValue1;
  }
  if (body.geoWithinField2) {
    data["geoWithin"][body.geoWithinField2] = body.geoWithinValue2;
  }
  if (body.geoWithinField3) {
    data["geoWithin"][body.geoWithinField3] = body.geoWithinValue3;
  }

  if (body.hasDriveThroughServiceField1) {
    data["hasDriveThroughService"] = {};
    data["hasDriveThroughService"]["@type"] = "Boolean";
    data["hasDriveThroughService"][body.hasDriveThroughServiceField1] =
      body.hasDriveThroughServiceValue1;
  }
  if (body.hasDriveThroughServiceField2) {
    data["hasDriveThroughService"][body.hasDriveThroughServiceField2] =
      body.hasDriveThroughServiceValue2;
  }
  if (body.hasDriveThroughServiceField3) {
    data["hasDriveThroughService"][body.hasDriveThroughServiceField3] =
      body.hasDriveThroughServiceValue3;
  }

  if (body.hasMapField1) {
    data["hasMap"] = {};
    data["hasMap"]["@type"] = "Map";
    data["hasMap"][body.hasMapField1] = body.hasMapValue1;
  }
  if (body.hasMapField2) {
    data["hasMap"][body.hasMapField2] = body.hasMapValue2;
  }
  if (body.hasMapField3) {
    data["hasMap"][body.hasMapField3] = body.hasMapValue3;
  }

  if (body.latitudeField1) {
    data["latitude"] = {};
    data["latitude"]["@type"] = "Number";
    data["latitude"][body.latitudeField1] = body.latitudeValue1;
  }
  if (body.latitudeField2) {
    data["latitude"][body.latitudeField2] = body.latitudeValue2;
  }
  if (body.latitudeField3) {
    data["latitude"][body.latitudeField3] = body.latitudeValue3;
  }

  if (body.longitudeField1) {
    data["longitude"] = {};
    data["longitude"]["@type"] = "Number";
    data["longitude"][body.longitudeField1] = body.longitudeValue1;
  }
  if (body.longitudeField2) {
    data["longitude"][body.longitudeField2] = body.longitudeValue2;
  }
  if (body.longitudeField3) {
    data["longitude"][body.longitudeField3] = body.longitudeValue3;
  }

  if (body.openingHoursSpecificationField1) {
    data["openingHoursSpecification"] = {};
    data["openingHoursSpecification"]["@type"] = "OpeningHoursSpecification";
    data["openingHoursSpecification"][body.openingHoursSpecificationField1] =
      body.openingHoursSpecificationValue1;
  }
  if (body.openingHoursSpecificationField2) {
    data["openingHoursSpecification"][body.openingHoursSpecificationField2] =
      body.openingHoursSpecificationValue2;
  }
  if (body.openingHoursSpecificationField3) {
    data["openingHoursSpecification"][body.openingHoursSpecificationField3] =
      body.openingHoursSpecificationValue3;
  }

  if (body.photoField1) {
    data["photo"] = {};
    data["photo"]["@type"] = "Photograph";
    data["photo"][body.photoField1] = body.photoValue1;
  }
  if (body.photoField2) {
    data["photo"][body.photoField2] = body.photoValue2;
  }
  if (body.photoField3) {
    data["photo"][body.photoField3] = body.photoValue3;
  }

  if (body.publicAccessField1) {
    data["publicAccess"] = {};
    data["publicAccess"]["@type"] = "Boolean";
    data["publicAccess"][body.publicAccessField1] = body.publicAccessValue1;
  }
  if (body.publicAccessField2) {
    data["publicAccess"][body.publicAccessField2] = body.publicAccessValue2;
  }
  if (body.publicAccessField3) {
    data["publicAccess"][body.publicAccessField3] = body.publicAccessValue3;
  }

  if (body.smokingAllowedField1) {
    data["smokingAllowed"] = {};
    data["smokingAllowed"]["@type"] = "Boolean";
    data["smokingAllowed"][body.smokingAllowedField1] =
      body.smokingAllowedValue1;
  }
  if (body.smokingAllowedField2) {
    data["smokingAllowed"][body.smokingAllowedField2] =
      body.smokingAllowedValue2;
  }
  if (body.smokingAllowedField3) {
    data["smokingAllowed"][body.smokingAllowedField3] =
      body.smokingAllowedValue3;
  }

  if (body.specialOpeningHoursSpecificationField1) {
    data["specialOpeningHoursSpecification"] = {};
    data["specialOpeningHoursSpecification"]["@type"] =
      "OpeningHoursSpecification";
    data["specialOpeningHoursSpecification"][
      body.specialOpeningHoursSpecificationField1
    ] = body.specialOpeningHoursSpecificationValue1;
  }
  if (body.specialOpeningHoursSpecificationField2) {
    data["specialOpeningHoursSpecification"][
      body.specialOpeningHoursSpecificationField2
    ] = body.specialOpeningHoursSpecificationValue2;
  }
  if (body.specialOpeningHoursSpecificationField3) {
    data["specialOpeningHoursSpecification"][
      body.specialOpeningHoursSpecificationField3
    ] = body.specialOpeningHoursSpecificationValue3;
  }

  if (body.tourBookingPageField1) {
    data["tourBookingPage"] = {};
    data["tourBookingPage"]["@type"] = "URL";
    data["tourBookingPage"][body.tourBookingPageField1] =
      body.tourBookingPageValue1;
  }
  if (body.tourBookingPageField2) {
    data["tourBookingPage"][body.tourBookingPageField2] =
      body.tourBookingPageValue2;
  }
  if (body.tourBookingPageField3) {
    data["tourBookingPage"][body.tourBookingPageField3] =
      body.tourBookingPageValue3;
  }

  if (body.categoryField1) {
    data["category"] = {};
    data["category"]["@type"] = "CategoryCode";
    data["category"][body.categoryField1] = body.categoryValue1;
  }
  if (body.categoryField2) {
    data["category"][body.categoryField2] = body.categoryValue2;
  }
  if (body.categoryField3) {
    data["category"][body.categoryField3] = body.categoryValue3;
  }

  if (body.colorField1) {
    data["color"] = {};
    data["color"]["@type"] = "Text";
    data["color"][body.colorField1] = body.colorValue1;
  }
  if (body.colorField2) {
    data["color"][body.colorField2] = body.colorValue2;
  }
  if (body.colorField3) {
    data["color"][body.colorField3] = body.colorValue3;
  }

  if (body.countryOfAssemblyField1) {
    data["countryOfAssembly"] = {};
    data["countryOfAssembly"]["@type"] = "Text";
    data["countryOfAssembly"][body.countryOfAssemblyField1] =
      body.countryOfAssemblyValue1;
  }
  if (body.countryOfAssemblyField2) {
    data["countryOfAssembly"][body.countryOfAssemblyField2] =
      body.countryOfAssemblyValue2;
  }
  if (body.countryOfAssemblyField3) {
    data["countryOfAssembly"][body.countryOfAssemblyField3] =
      body.countryOfAssemblyValue3;
  }

  if (body.countryOfLastProcessingField1) {
    data["countryOfLastProcessing"] = {};
    data["countryOfLastProcessing"]["@type"] = "Text";
    data["countryOfLastProcessing"][body.countryOfLastProcessingField1] =
      body.countryOfLastProcessingValue1;
  }
  if (body.countryOfLastProcessingField2) {
    data["countryOfLastProcessing"][body.countryOfLastProcessingField2] =
      body.countryOfLastProcessingValue2;
  }
  if (body.countryOfLastProcessingField3) {
    data["countryOfLastProcessing"][body.countryOfLastProcessingField3] =
      body.countryOfLastProcessingValue3;
  }

  if (body.depthField1) {
    data["depth"] = {};
    data["depth"]["@type"] = "Distance";
    data["depth"][body.depthField1] = body.depthValue1;
  }
  if (body.depthField2) {
    data["depth"][body.depthField2] = body.depthValue2;
  }
  if (body.depthField3) {
    data["depth"][body.depthField3] = body.depthValue3;
  }

  if (body.gtinField1) {
    data["gtin"] = {};
    data["gtin"]["@type"] = "Text";
    data["gtin"][body.gtinField1] = body.gtinValue1;
  }
  if (body.gtinField2) {
    data["gtin"][body.gtinField2] = body.gtinValue2;
  }
  if (body.gtinField3) {
    data["gtin"][body.gtinField3] = body.gtinValue3;
  }

  if (body.gtin12Field1) {
    data["gtin12"] = {};
    data["gtin12"]["@type"] = "Text";
    data["gtin12"][body.gtin12Field1] = body.gtin12Value1;
  }
  if (body.gtin12Field2) {
    data["gtin12"][body.gtin12Field2] = body.gtin12Value2;
  }
  if (body.gtin12ield3) {
    data["gtin12"][body.gtin12Field3] = body.gtin12Value3;
  }

  if (body.gtin13Field1) {
    data["gtin13"] = {};
    data["gtin13"]["@type"] = "Text";
    data["gtin13"][body.gtin13Field1] = body.gtin13Value1;
  }
  if (body.gtin13Field2) {
    data["gtin13"][body.gtin13Field2] = body.gtin13Value2;
  }
  if (body.gtin13Field3) {
    data["gtin13"][body.gtin13Field3] = body.gtin13Value3;
  }

  if (body.gtin14Field1) {
    data["gtin14"] = {};
    data["gtin14"]["@type"] = "Text";
    data["gtin14"][body.gtin14Field1] = body.gtin14Value1;
  }
  if (body.gtin14Field2) {
    data["gtin14"][body.gtin14Field2] = body.gtin14Value2;
  }
  if (body.gtin14Field3) {
    data["gtin14"][body.gtin14Field3] = body.gtin14Value3;
  }

  if (body.gtin8Field1) {
    data["gtin8"] = {};
    data["gtin8"]["@type"] = "Text";
    data["gtin8"][body.gtin8Field1] = body.gtin8Value1;
  }
  if (body.gtin8Field2) {
    data["gtin8"][body.gtin8Field2] = body.gtin8Value2;
  }
  if (body.gtin8Field3) {
    data["gtin8"][body.gtin8Field3] = body.gtin8Value3;
  }

  if (body.hasAdultConsiderationField1) {
    data["hasAdultConsideration"] = {};
    data["hasAdultConsideration"]["@type"] = "AdultOrientedEnumeration";
    data["hasAdultConsideration"][body.hasAdultConsiderationField1] =
      body.hasAdultConsiderationValue1;
  }
  if (body.hasAdultConsiderationField2) {
    data["hasAdultConsideration"][body.hasAdultConsiderationField2] =
      body.hasAdultConsiderationValue2;
  }
  if (body.hasAdultConsiderationField3) {
    data["hasAdultConsideration"][body.hasAdultConsiderationField3] =
      body.hasAdultConsiderationValue3;
  }

  if (body.hasEnergyConsumptionDetailsField1) {
    data["hasEnergyConsumptionDetails"] = {};
    data["hasEnergyConsumptionDetails"]["@type"] = "EnergyConsumptionDetails";
    data["hasEnergyConsumptionDetails"][
      body.hasEnergyConsumptionDetailsField1
    ] = body.hasEnergyConsumptionDetailsValue1;
  }
  if (body.hasEnergyConsumptionDetailsField2) {
    data["hasEnergyConsumptionDetails"][
      body.hasEnergyConsumptionDetailsField2
    ] = body.hasEnergyConsumptionDetailsValue2;
  }
  if (body.hasEnergyConsumptionDetailsField3) {
    data["hasEnergyConsumptionDetails"][
      body.hasEnergyConsumptionDetailsField3
    ] = body.hasEnergyConsumptionDetailsValue3;
  }

  if (body.hasMeasurementField1) {
    data["hasMeasurement"] = {};
    data["hasMeasurement"]["@type"] = "QuantitativeValue";
    data["hasMeasurement"][body.hasMeasurementField1] =
      body.hasMeasurementValue1;
  }
  if (body.hasMeasurementField2) {
    data["hasMeasurement"][body.hasMeasurementField2] =
      body.hasMeasurementValue2;
  }
  if (body.hasMeasurementField3) {
    data["hasMeasurement"][body.hasMeasurementField3] =
      body.hasMeasurementValue3;
  }

  if (body.inProductGroupWithIDField1) {
    data["inProductGroupWithID"] = {};
    data["inProductGroupWithID"]["@type"] = "Text";
    data["inProductGroupWithID"][body.inProductGroupWithIDField1] =
      body.inProductGroupWithIDValue1;
  }
  if (body.inProductGroupWithIDField2) {
    data["inProductGroupWithID"][body.inProductGroupWithIDField2] =
      body.inProductGroupWithIDValue2;
  }
  if (body.inProductGroupWithIDField3) {
    data["inProductGroupWithID"][body.inProductGroupWithIDField3] =
      body.inProductGroupWithIDValue3;
  }

  if (body.isAccessoryOrSparePartForField1) {
    data["isAccessoryOrSparePartFor"] = {};
    data["isAccessoryOrSparePartFor"]["@type"] = "Product";
    data["isAccessoryOrSparePartFor"][body.isAccessoryOrSparePartForField1] =
      body.isAccessoryOrSparePartForValue1;
  }
  if (body.isAccessoryOrSparePartForField2) {
    data["isAccessoryOrSparePartFor"][body.isAccessoryOrSparePartForField2] =
      body.isAccessoryOrSparePartForValue2;
  }
  if (body.isAccessoryOrSparePartForField3) {
    data["isAccessoryOrSparePartFor"][body.isAccessoryOrSparePartForField3] =
      body.isAccessoryOrSparePartForValue3;
  }

  if (body.isConsumableForField1) {
    data["isConsumableFor"] = {};
    data["isConsumableFor"]["@type"] = "Product";
    data["isConsumableFor"][body.isConsumableForField1] =
      body.isConsumableForValue1;
  }
  if (body.isConsumableForField2) {
    data["isConsumableFor"][body.isConsumableForField2] =
      body.isConsumableForValue2;
  }
  if (body.isConsumableForField3) {
    data["isConsumableFor"][body.isConsumableForField3] =
      body.isConsumableForValue3;
  }

  if (body.isRelatedToField1) {
    data["isRelatedTo"] = {};
    data["isRelatedTo"]["@type"] = "Product";
    data["isRelatedTo"][body.isRelatedToField1] = body.isRelatedToValue1;
  }
  if (body.isRelatedToField2) {
    data["isRelatedTo"][body.isRelatedToField2] = body.isRelatedToValue2;
  }
  if (body.isRelatedToField3) {
    data["isRelatedTo"][body.isRelatedToField3] = body.isRelatedToValue3;
  }

  if (body.isSimilarToField1) {
    data["isSimilarTo"] = {};
    data["isSimilarTo"]["@type"] = "Product";
    data["isSimilarTo"][body.isSimilarToField1] = body.isSimilarToValue1;
  }
  if (body.isSimilarToField2) {
    data["isSimilarTo"][body.isSimilarToField2] = body.isSimilarToValue2;
  }
  if (body.isSimilarToField3) {
    data["isSimilarTo"][body.isSimilarToField3] = body.isSimilarToValue3;
  }

  if (body.isVariantOfField1) {
    data["isVariantOf"] = {};
    data["isVariantOf"]["@type"] = "ProductModel";
    data["isVariantOf"][body.isVariantOfField1] = body.isVariantOfValue1;
  }
  if (body.isVariantOfField2) {
    data["isVariantOf"][body.isVariantOfField2] = body.isVariantOfValue2;
  }
  if (body.isVariantOfField3) {
    data["isVariantOf"][bodyisVariantOf.Field3] = body.isVariantOfValue3;
  }

  if (body.itemConditionField1) {
    data["itemCondition"] = {};
    data["itemCondition"]["@type"] = "OfferItemCondition";
    data["itemCondition"][body.itemConditionField1] = body.itemConditionValue1;
  }
  if (body.itemConditionField2) {
    data["itemCondition"][body.itemConditionField2] = body.itemConditionValue2;
  }
  if (body.itemConditionField3) {
    data["itemCondition"][body.itemConditionField3] = body.itemConditionValue3;
  }

  if (body.manufacturerField1) {
    data["manufacturer"] = {};
    data["manufacturer"]["@type"] = "Organization";
    data["manufacturer"][body.manufacturerField1] = body.manufacturerValue1;
  }
  if (body.manufacturerField2) {
    data["manufacturer"][body.manufacturerField2] = body.manufacturerValue2;
  }
  if (body.manufacturerField3) {
    data["manufacturer"][body.manufacturerField3] = body.manufacturerValue3;
  }

  if (body.modelField1) {
    data["model"] = {};
    data["model"]["@type"] = "ProductModel";
    data["model"][body.modelField1] = body.modelValue1;
  }
  if (body.modelField2) {
    data["model"][body.modelField2] = body.modelValue2;
  }
  if (body.modelField3) {
    data["model"][body.modelField3] = body.modelValue3;
  }

  if (body.mpnField1) {
    data["mpn"] = {};
    data["mpn"]["@type"] = "Text";
    data["mpn"][body.mpnField1] = body.mpnValue1;
  }
  if (body.mpnField2) {
    data["mpn"][body.mpnField2] = body.mpnValue2;
  }
  if (body.mpnField3) {
    data["mpn"][body.mpnField3] = body.mpnValue3;
  }

  if (body.nsnField1) {
    data["nsn"] = {};
    data["nsn"]["@type"] = "Text";
    data["nsn"][body.nsnField1] = body.nsnValue1;
  }
  if (body.nsnField2) {
    data["nsn"][body.nsnField2] = body.nsnValue2;
  }
  if (body.nsnField3) {
    data["nsn"][body.nsnField3] = body.nsnValue3;
  }

  if (body.productIDField1) {
    data["productID"] = {};
    data["productID"]["@type"] = "Text";
    data["productID"][body.productIDField1] = body.productIDValue1;
  }
  if (body.productIDField2) {
    data["productID"][body.productIDField2] = body.productIDValue2;
  }
  if (body.productIDField3) {
    data["productID"][body.productIDField3] = body.productIDValue3;
  }

  if (body.productionDateField1) {
    data["productionDate"] = {};
    data["productionDate"]["@type"] = "Date";
    data["productionDate"][body.productionDateField1] =
      body.productionDateValue1;
  }
  if (body.productionDateField2) {
    data["productionDate"][body.productionDateField2] =
      body.productionDateValue2;
  }
  if (body.productionDateField3) {
    data["productionDate"][body.productionDateField3] =
      body.productionDateValue3;
  }

  if (body.purchaseDateField1) {
    data["purchaseDate"] = {};
    data["purchaseDate"]["@type"] = "Date";
    data["purchaseDate"][body.purchaseDateField1] = body.purchaseDateValue1;
  }
  if (body.purchaseDateField2) {
    data["purchaseDate"][body.purchaseDateField2] = body.purchaseDateValue2;
  }
  if (body.purchaseDateField3) {
    data["purchaseDate"][body.purchaseDateField3] = body.purchaseDateValue3;
  }

  if (body.releaseDateField1) {
    data["releaseDate"] = {};
    data["releaseDate"]["@type"] = "Date";
    data["releaseDate"][body.releaseDateField1] = body.releaseDateValue1;
  }
  if (body.releaseDateField2) {
    data["releaseDate"][body.releaseDateField2] = body.releaseDateValue2;
  }
  if (body.releaseDateField3) {
    data["releaseDate"][body.releaseDateField3] = body.releaseDateValue3;
  }

  if (body.skuField1) {
    data["sku"] = {};
    data["sku"]["@type"] = "Text";
    data["sku"][body.skuField1] = body.skuValue1;
  }
  if (body.skuField2) {
    data["sku"][body.skuField2] = body.skuValue2;
  }
  if (body.skuField3) {
    data["sku"][body.skuField3] = body.skuValue3;
  }

  if (body.widthField1) {
    data["width"] = {};
    data["width"]["@type"] = "Distance";
    data["width"][body.widthField1] = body.widthValue1;
  }
  if (body.widthField2) {
    data["width"][body.widthField2] = body.widthValue2;
  }
  if (body.widthField3) {
    data["width"][body.widthField3] = body.widthValue3;
  }

  document.getElementById("txn_data").value = JSON.stringify(data);
};