﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace LMPlatform.UI.Services.Modules.Labs
{
	[DataContract]
	public class HasJobProtection
	{
		[DataMember]
		public int GroupId { get; set; }

		[DataMember]
		public bool HasJob { get; set; }
	}
}